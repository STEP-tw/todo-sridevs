const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
const fs = require('fs');
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
/*============================================================================*/
let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);

module.exports = app;
