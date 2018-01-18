let fs = require('fs');
let publicDir = process.env.PUBLICDIRPATH || './public/';
let lib = {};
let timeStamp = require('./time.js').timeStamp;
let registered_users = require('./data/registeredUsers.js').registered_users;
let Todo = require('./todo.js');
let TodoRepository = require('./todoRepository.js').TodoRepository;
let User = require('./user.js').User;

let toJsonString = o=>JSON.stringify(o,null,2);

let fromJson =function (classObj,jsonObj) {
  let obj = JSON.parse(jsonObj);
  return obj = new classObj(...Object.values(obj));
}

let setContentType = function (response,fileName) {
  let headers = {
    js: 'text/javascript',
    html: 'text/html',
    css:  'text/css',
    jpg: 'img/jpg',
    pdf: 'application/pdf',
    gif: 'image/gif',
    ico: 'image/ico',
    txt: 'text/plain',
    json: 'application/json',
    undefined: 'text/plain'
  }

  let fileType = fileName.split('.')[2];
  console.log('Content-Type has been set as', headers[fileType]);
  response.setHeader('Content-Type',headers[fileType]);
};


let getFileName = function (request) {
  let fileName = request.url.substr(1);
  if (lib.isItData(request.url)) {
    return fileName;
  }else {
    return publicDir + (fileName || 'loginPage.html');
  }
};

let getUserName = function (req) {
  return req.body.userName || req.cookies.userName;
}

let refineContents = function (contents) {
  contents = contents.replace(/\+/g,' ');
  refinedcontents = decodeURIComponent(contents);
  return refinedcontents;
};

lib.isItData = function (fileName) {
  let validDataFiles = ['data/todoList.json'];
  return fileName.includes(validDataFiles);
};

lib.handleRequests = function (request, response) {
  // Read the requested file content from file system
  let fileName = getFileName(request);
  // Print the name of the file for which request is made.
  console.log("Request for " + fileName + " received.");
  let data = fs.readFileSync(fileName);
  setContentType(response,fileName);
  response.write(data);
  if(request.cookies.logInFailed && request.url == '/') {
    response.write('<p>login Failed</p>');
  }
  response.end();
}

lib.handleLogout = (req,res)=>{
  delete req.userName;
  res.setHeader('Set-Cookie',[`logInFailed=false;Expires=${new Date(1).toUTCString()}`]);
  res.redirect('/');
}

let getFilePath = function (usrName) {
  return `./data/${usrName}.json`;
}

lib.handleLogin = (req,res)=>{
  let usrName = getUserName(req);
  let userRepo = new User(usrName)
  let filePath = getFilePath(usrName);
  let user = registered_users.find(u=>u.userName==usrName);
  if(!user) {
    res.setHeader('Set-Cookie','logInFailed=true');
    res.redirect('/');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  res.setHeader('Set-Cookie',`userName=${usrName}`);
  user.sessionid = sessionid;
  if (!fs.existsSync(filePath)) {
    fs.writeFile(filePath,toJsonString(userRepo));
  }
  res.redirect('/homePage.html');
}

lib.storeTodo = function (req,res) {
  debugger;
  let usrName = getUserName(req);
  let filePath = getFilePath(usrName);
  let todoTitle = refineContents(req.body.title);
  let todoDescription = refineContents(req.body.description);
  let todo = new Todo(todoTitle,todoDescription);
  let usrRepo = fromJson(User,fs.readFileSync(filePath));
  usrRepo.todoRepository = fromJson(TodoRepository,toJsonString(usrRepo.todoRepository));
  usrRepo.addTodo(todo);
  fs.writeFile(filePath,toJsonString(usrRepo));
  res.redirect('/homePage.html');
};

lib.loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

lib.logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toJsonString(req.headers)}`,
    `COOKIES=> ${toJsonString(req.cookies)}`,
    `BODY=> ${toJsonString(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
};

exports.lib = lib;
