const prefix= '../src/';
const TodoBank = require(`${prefix}TodoBank.js`).TodoBank;
const Todo = require(`${prefix}Todo.js`).Todo;
const assert = require('chai').assert;

var todoBank , todo1 , todo2;

describe('TodoBank',function () {
  beforeEach(function () {
    todoBank = new TodoBank;
    todo1 = new Todo('dev','first','firstTodo');
    todo2 = new Todo('dev','second,secondTodo');
  })
  it('should create an instance of it',function () {
    assert.isTrue(todoBank instanceof TodoBank);
  })

  describe('assignKeyValue',function () {
    it('should assignKeyValue to a given obj',function () {
      let actual = todoBank.assignKeyValue({},'key','value');
      assert.deepEqual(actual,{'key': 'value'});
    })
  })
  describe('fetch',function () {
    it('fetches the value of the given key',function () {
      assert.deepEqual(todoBank.fetch({a: 1, b: 2},'b'),2);
    })
  })
  describe('addTodo',function () {
    it('should addTodo into its todoList',function () {
      todoBank.addTodo(todo1);
      todoBank.addTodo(todo2);
      assert.deepEqual(todoBank.todos[todo1.id],todo1);
      assert.deepEqual(todoBank.todos[todo2.id],todo2);
    })
  })
  describe('markDone',function () {
    beforeEach(function () {
      todoBank.addTodo(todo1);
      todoBank.addTodo(todo2);
      todoBank.markDone(todo2);
      todoBank.markDone(todo1);
    })
    it('should add the given todo in completedTodos',function () {
      assert.deepEqual(todoBank.completedTodos[todo1.id],todo1);
      assert.deepEqual(todoBank.completedTodos[todo2.id],todo2);
    })
    it('should change the status of given todo to done ',function () {
      function isDone(todo) {
        return todoBank.todos[todo.id].status === 'done';
      }
      assert.isTrue(isDone(todo1));
      assert.isTrue(isDone(todo2));
    })
  })
  describe.skip('getLiveTodo',function () {
    it('should get the list of liveTodos',function () {
      todoBank.getLiveTodo;
      assert.deepEqual(todoBank.liveTodos)
    })
  })
  describe.skip('deleteTodo',function () {
    it('should mark a todo as deleted',function () {
      todoBank.deleteTodo(todo1);
      assert.deepEqual(todoBank.deletedTodos,[todo1]);
    })
  })
})
