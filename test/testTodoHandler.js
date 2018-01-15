const prefix= '../src/'
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
})
