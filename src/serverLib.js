let fs = require('fs');
let publicDir = process.env.PUBLICDIRPATH || './public/';
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

let getFileName = function (request) {
  let fileName = request.url.substr(1)
  return publicDir + (fileName || 'loginPage.html');
};

let handleRequests = function (request, response) {
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

let handleLogout = (req,res)=>{
  res.setHeader('Set-Cookie',[`logInFailed=false;Expires=${new Date(1).toUTCString()}`]);
  res.redirect('/');
}

exports.handleLogout = handleLogout;
exports.handleRequests = handleRequests;
