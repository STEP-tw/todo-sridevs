const fs = require('fs');
lib = {};
exports.lib = lib;

lib.storeTodo = function (req,res) {
  console.log('----------',req.body);
  let todoTitle = req.body.title;
  let todoDescription = req.body.description;
  let titleWithDesc = JSON.stringify({
    "title":todoTitle,
    "description": todoDescription
  })
  fs.appendFile("./data/todoList.json",titleWithDesc);
  res.redirect('/homePage.html');
};
