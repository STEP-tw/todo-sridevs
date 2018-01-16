const prefix= '../src/';
const TodoHandler = require(`${prefix}TodoHandler.js`).TodoHandler;
const Todo = require(`${prefix}Todo.js`).Todo;
const assert = require('chai').assert;

var todoHandler , todo1 , todo2;

describe('TodoHandler',function () {
  beforeEach(function () {
    todoHandler = new TodoHandler;
    todo1 = new Todo('dev','first','firstTodo');
    todo2 = new Todo('dev','second,secondTodo');
  })
  it('should create an instance of it',function () {
    assert.isTrue(todoHandler instanceof TodoHandler);
  })
  describe('addTodo',function () {
    it('should addTodo into its todoList',function () {
      todoHandler.addTodo(todo1);
      todoHandler.addTodo(todo2);
      assert.deepEqual(todoHandler.todos[todo1.id],todo1);
      assert.deepEqual(todoHandler.todos[todo2.id],todo2);
    })
  })
  describe('markDone',function () {
    beforeEach(function () {
      todoHandler.addTodo(todo1);
      todoHandler.addTodo(todo2);
      todoHandler.markDone(todo2);
      todoHandler.markDone(todo1);
    })
    it('should add the given todo in completedTodos',function () {
      assert.deepEqual(todoHandler.completedTodos[todo1.id],todo1);
      assert.deepEqual(todoHandler.completedTodos[todo2.id],todo2);
    })
    it('should change the status of given todo to done ',function () {
      function isDone(todo) {
        return todoHandler.todos[todo.id].status === 'done';
      }
      assert.isTrue(isDone(todo1));
      assert.isTrue(isDone(todo2));
    })
  })
  describe.skip('getLiveTodo',function () {
    it('should get the list of liveTodos',function () {
      todoHandler.getLiveTodo;
      assert.deepEqual(this.liveTodos)
    })
  })
  describe.skip('deleteTodo',function () {
    it('should mark a todo as deleted',function () {
      todoHandler.deleteTodo(todo1);
      assert.deepEqual(todoHandler.deletedTodos,[todo1]);
    })
  })
})
