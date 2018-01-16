const fs = require('fs');
const Todo = require('./todo.js').Todo;
let utils = {};
utils.assignKeyValue = function(obj,key,value) {
  obj[key] = value;
  return obj;
}

utils.fetch = function(obj,key) {
  return obj[key];
}

class TodoRepository {
  constructor(todos,deletedTodos,completedTodos,liveTodos) {
    this.todos = todos || {};
    this.deletedTodos = deletedTodos || {};
    this.completedTodos = completedTodos  || {};
    this.liveTodos = liveTodos || {};
  }

  addTodo(todo) {
    utils.assignKeyValue(this.todos,todo.id,todo);
    utils.assignKeyValue(this.liveTodos,todo.id,todo);
    return this.todos;
  }

  markDone(todo) {
    utils.fetch(this.todos,todo.id).markDone();
    utils.assignKeyValue(this.completedTodos,todo.id,todo);
  }

  markUndone(todo) {
    fetch(this.todos,todo.id).markUndone();
    delete this.completedTodos[todo.id];
  }
}
// lib.storeTodo = function (req,res) {
//   let todoTitle = req.body.title;
//   let todoDescription = req.body.description;
//   let titleWithDesc = JSON.stringify({
//     "title":todoTitle,
//     "description": todoDescription
//   })
//   let todoList = fs.readFileSync("./data/todoList.json") + titleWithDesc;
//   fs.writeFile("./data/todoList.json",todoList);
//   res.redirect('/homePage.html');
// };

exports.TodoRepository = TodoRepository;
exports.utils = utils;
