const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
const fs = require('fs');
const handleRequests = require('./serverLib.js').handleRequests;
const handleLogout = require('./serverLib.js').handleLogout;
const todoLib = require('./todoHandler.js').lib;
let publicDir = process.env.PUBLICDIRPATH || 'public';
let registered_users = [{userName:'dev',name:'sridevs'}];
let toS = o=>JSON.stringify(o,null,2);
/*============================================================================*/
let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
}
let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};
let serveStaticFiles = (req,res)=>{
  let path = publicDir + req.url;
  if (fs.existsSync(path)) {
    app.get(req.url,handleRequests);
  }
}

/*============================================================================*/
let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(serveStaticFiles)
app.get('/logout',handleLogout);
app.post('/',(req,res)=>{
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
});
// app.post('/todoWithDesc',todoLib.storeTodo);
module.exports = app;
