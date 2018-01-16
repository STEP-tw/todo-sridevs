const fs = require('fs');
const Todo = require('./todo.js').Todo;

class TodoHandler {
  constructor(todos,deletedTodos,completedTodos,liveTodos) {
    this.todos = todos || {};
    this.deletedTodos = deletedTodos || {};
    this.completedTodos = completedTodos  || {};
    this.liveTodos = liveTodos || {};
  }

  addTodo(todo) {
    this.todos[todo.id] = todo;
    return this.todos;
  }

  markDone(todo) {
    this.todos[todo.id].markDone();
    this.completedTodos[todo.id] = todo;
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

exports.TodoHandler = TodoHandler;
