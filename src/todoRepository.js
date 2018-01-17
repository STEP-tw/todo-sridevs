const fs = require('fs');
const Todo = require('./todo.js');
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
    delete this.liveTodos[todo.id]
    utils.assignKeyValue(this.completedTodos,todo.id,todo);
  }

  markUndone(todo) {
    utils.fetch(this.todos,todo.id).markUndone();
    delete this.completedTodos[todo.id];
    utils.assignKeyValue(this.liveTodos,todo.id,todo);
  }

  deleteTodo(todo) {
    utils.fetch(this.todos,todo.id).markDeleted();
    utils.assignKeyValue(this.deletedTodos,todo.id,todo);
    delete this.liveTodos[todo.id];
  }
}

exports.TodoRepository = TodoRepository;
exports.utils = utils;
