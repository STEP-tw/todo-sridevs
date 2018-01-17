const TodoRepository = require('./todoRepository');
const Counter = require('./counter.js').Counter;
const idGenerator = new Counter;
class User {
  constructor(name,todoRepository) {
    this.id = idGenerator.increment();
    this.name = name || '';
    this.todoRepository = todoRepository || {};
  }


}
exports.User = User;