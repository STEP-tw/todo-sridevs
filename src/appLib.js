let fs = require('fs');
let publicDir = process.env.PUBLICDIRPATH || './public/';
let lib = {};
let timeStamp = require('./time.js').timeStamp;
let registered_users = require('./data/registeredUsers.js').registered_users;
let Todo = require('./todo.js');
let TodoRepository = require('./todoRepository.js').TodoRepository;
let User = require('./user.js').User;
let Crypter = new require('./crypter.js');
let key = 'r@-';
let crypter = new Crypter(key);

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

let respondWithFile = function (res,fileName) {
  let data = fs.readFileSync(fileName);
  setContentType(res,fileName);
  res.write(data);
};

let handleLoginFail = function (req,res) {
  if(req.cookies.logInFailed && request.url == '/') {
    res.write('<p>login Failed</p>');
  }
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
  debugger;
  return req.body.userName || req.cookies.userName;
}

let refineContents = function (contents) {
  content = contents.replace(/\+/g,' ');
  refinedcontents = decodeURIComponent(content);
  return refinedcontents;
};

let createTodo = function (req) {
  let todoTitle = refineContents(req.body.title);
  let todoDescription = refineContents(req.body.description);
  return new Todo(todoTitle,todoDescription);
};

let fetchUserRepo = function (filePath) {
  let userRepo = fromJson(User,fs.readFileSync(filePath));
  userRepo.todoRepository = fromJson(TodoRepository,toJsonString(userRepo.todoRepository));
  return userRepo;
};

let addTodo = function (filePath,todo) {
  debugger;
  let usrRepo = fetchUserRepo(filePath);
  usrRepo.addTodo(todo);
  fs.writeFile(filePath,toJsonString(usrRepo));
}


lib.storeTodo = function (req,res) {
  debugger;
  let usrName = crypter.decrypt(getUserName(req));
  let filePath = getFilePath(usrName);
  let todo = createTodo(req);
  addTodo(filePath,todo);
  res.redirect('/homePage.html');
};

lib.displayTodo = function (req,res) {
  debugger;
  let usrName = crypter.decrypt(getUserName(req));
  let filePath = getFilePath(usrName);
  let userRepo = fetchUserRepo(filePath);
  let todos = toJsonString(userRepo.liveTodos);
  setContentType(res,filePath);
  res.write(todos);
  res.end();
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
  respondWithFile(response,fileName);
  handleLoginFail(request,response);
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
  debugger;
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
  res.setHeader('Set-Cookie',`userName=${crypter.encrypt(usrName)}`);
  user.sessionid = sessionid;
  if (!fs.existsSync(filePath)) {
    fs.writeFile(filePath,toJsonString(userRepo));
  }
  res.redirect('/homePage.html');
}

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
