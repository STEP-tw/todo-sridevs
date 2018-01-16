const fs = require('fs');
const Todo = require('./todo.js').Todo;
const IdHandler = require('./IdHandler.js').IdHandler;
const idHandler = new IdHandler(-1);

class TodoHandler {
  constructor(todos,deletedTodos,completedTodos,liveTodos) {
    this.id = idHandler.id;
    this.todos = todos || [];
    this.deletedTodos = deletedTodos || [];
    this.completedTodos = completedTodos  || [];
    this.liveTodos = liveTodos || [];
  }

  addTodo(todo) {
    this.todos.push(todo);
    return this.todos;
  }

  markDone(todo) {
    this.todos[todo.id].status = 'done';
    this.todos.completedTodos.push(todo);
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
