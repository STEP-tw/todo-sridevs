const fs = require('fs');
const Todo = require('./todo.js').Todo;

class TodoBank {
  constructor(todos,deletedTodos,completedTodos,liveTodos) {
    this.todos = todos || {};
    this.deletedTodos = deletedTodos || {};
    this.completedTodos = completedTodos  || {};
    this.liveTodos = liveTodos || {};
  }

  assignKeyValue(obj,key,value) {
    obj[key] = value;
    return obj;
  }

  fetch(obj,key) {
    return obj[key];
  }

  addTodo(todo) {
    this.assignKeyValue(this.todos,todo.id,todo);
    this.assignKeyValue(this.liveTodos,todo.id,todo);
    return this.todos;
  }

  markDone(todo) {
    this.fetch(this.todos,todo.id).markDone();
    this.assignKeyValue(this.completedTodos,todo.id,todo);
  }

  markUndone(todo) {
    this.fetch(this.todos,todo.id).markUndone();
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

exports.TodoBank = TodoBank;
