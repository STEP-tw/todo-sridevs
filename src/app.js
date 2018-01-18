const WebApp = require('./webapp');
const fs = require('fs');
const lib = require('./appLib.js').lib;
const publicDir = process.env.PUBLICDIRPATH || 'public';

/*============================================================================*/
let serveStaticFiles = (req,res)=>{
  let path = publicDir + req.url;
  if (fs.existsSync(path) || lib.isItData(req.url)) {
    app.get(req.url,lib.handleRequests);
  }
}

/*============================================================================*/
let app = WebApp.create();
app.use(lib.logRequest);
app.use(lib.loadUser);
app.use(serveStaticFiles)
app.get('/logout',lib.handleLogout);
// app.get('/showTodo',displayTodo);
app.post('/',lib.handleLogin);
app.post('/addTodo',lib.storeTodo);
module.exports = app;
