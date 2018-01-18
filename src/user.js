const TodoRepository = require('./todoRepository').TodoRepository;
const Counter = require('./counter.js').Counter;
const idGenerator = new Counter;
class User {
  constructor(name,id,todoRepository) {
    this.name = name || '';
    this.id = id || idGenerator.increment();
    this.todoRepository = todoRepository || new TodoRepository;
  }

  addRepo(repo) {
    return this.todoRepository = repo;
  }

  emptyRepo(repo) {
    return this.todoRepository = {};
  }

  addTodo(todo) {
    return this.todoRepository.addTodo(todo);
  }
}
exports.User = User;
