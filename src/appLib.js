let fs = require('fs');
let publicDir = process.env.PUBLICDIRPATH || './public/';
let lib = {};
let timeStamp = require('./time.js').timeStamp;
let toS = o=>JSON.stringify(o,null,2);
let registered_users = require('./data/registeredUsers.js').registered_users;

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
  res.setHeader('Set-Cookie',[`logInFailed=false;Expires=${new Date(1).toUTCString()}`]);
  res.redirect('/');
}

lib.handleLogin = (req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true`);
    res.redirect('/');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/homePage.html');
}

lib.storeTodo = function (req,res) {
  let todoTitle = req.body.title;
  let todoDescription = req.body.description;
  let titleWithDesc = {
    "title":todoTitle,
    "description": todoDescription
  };
  let todoList = JSON.parse(fs.readFileSync("./data/todoList.json"));
  todoList.push(titleWithDesc);
  fs.writeFile("./data/todoList.json",JSON.stringify(todoList,null,2));
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
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
};

exports.lib = lib;
