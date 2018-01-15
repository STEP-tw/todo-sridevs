const fs = require('fs');
lib = {};
exports.lib = lib;

lib.storeTodo = function (req,res) {
  let todoTitle = req.body.title;
  let todoDescription = req.body.description;
  let titleWithDesc = JSON.stringify({
    "title":todoTitle,
    "description": todoDescription
  })
  let todoList = fs.readFileSync("./data/todoList.json") + titleWithDesc;
  fs.writeFile("./data/todoList.json",todoList);
  res.redirect('/homePage.html');
};
