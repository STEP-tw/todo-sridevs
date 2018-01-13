let fs = require('fs');
let prependFile = require('prepend-file');

let publicDir = process.env.PUBLICDIRPATH || './public/';
let registered_users = [{userName:'dev',name:'sridevs'}];
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
    undefined: 'text/plain'
  }

  let fileType = fileName.split('.')[2];
  console.log('Content-Type has been set as', headers[fileType]);
  response.setHeader('Content-Type',headers[fileType]);
};
console.log('------------------',process.cwd());
let getFileName = function (request) {
  let fileName = request.url.substr(1)
  return publicDir + (fileName || 'loginPage.html');
};

let replaceEqualsWithColon = function (string) {
  return string.replace('=',':');
};

let joinStrings = function (strg1,strg2) {
  return strg1 + " " + strg2;
};

let getTime = function () {
  let date = new Date;
  let humanReadableDate = date.toDateString();
  let humanReadableTime = date.toLocaleTimeString();
  return joinStrings(humanReadableDate,humanReadableTime);
};

let handleRequests = function (request, response) {
  // Read the requested file content from file system
  let fileName = getFileName(request);
  // Print the name of the file for which request is made.
  console.log("Request for " + fileName + " received.");
  let data = fs.readFileSync(fileName);
  setContentType(response,fileName);
  // if(request.cookies.logInFailed) response.write('<p>logIn Failed</p>');
  response.write(data);
  response.end();
}

let handleLogout = (req,res)=>{
  res.setHeader('Set-Cookie',[`logInFailed=false;sessionid=0;Expires=${new Date(1).toUTCString()}`]);
  res.redirect('/');
}

exports.handleLogout = handleLogout;
exports.handleRequests = handleRequests;
