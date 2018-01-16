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
      assert.includeDeepOrderedMembers(todoHandler.todos,[todo1,todo2]);
    })
  })
  describe.skip('markDone',function () {
    it('should change the status of given todo to done',function () {
      todoHandler.markDone(todo2);
      todoHandler.markDone(todo1);
      assert.includeDeepOrderedMembers(this.completed,[todo2,todo1]);
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
