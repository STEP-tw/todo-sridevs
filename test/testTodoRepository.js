const prefix= '../src/';
const TodoRepository = require(`${prefix}todoRepository.js`).TodoRepository;
const utils = require(`${prefix}todoRepository.js`).utils;
const Todo = require(`${prefix}todo.js`).Todo;
const assert = require('chai').assert;
const toS = o=>JSON.stringify(o,null,2);

var todoRepository , todo1 , todo2;

describe('TodoRepository',function () {
  beforeEach(function () {
    todoRepository = new TodoRepository;
    todo1 = new Todo('dev','first','firstTodo');
    todo2 = new Todo('dev','second,secondTodo');
  })
  it('should create an instance of it',function () {
    assert.isTrue(todoRepository instanceof TodoRepository);
  })

  describe('assignKeyValue',function () {
    it('should assignKeyValue to a given obj',function () {
      let actual = utils.assignKeyValue({},'key','value');
      assert.deepEqual(actual,{'key': 'value'});
    })
  })
  describe('fetch',function () {
    it('fetches the value of the given key',function () {
      assert.deepEqual(utils.fetch({a: 1, b: 2},'b'),2);
    })
  })
  describe('addTodo',function () {
    it('should addTodo into its todoList',function () {
      todoRepository.addTodo(todo1);
      todoRepository.addTodo(todo2);
      assert.deepEqual(todoRepository.todos[todo1.id],todo1);
      assert.deepEqual(todoRepository.todos[todo2.id],todo2);
    })
  })
  describe('markDone',function () {
    beforeEach(function () {
      todoRepository.addTodo(todo1);
      todoRepository.addTodo(todo2);
      todoRepository.markDone(todo2);
      todoRepository.markDone(todo1);
    })
    it('should add the given todo in completedTodos',function () {
      assert.deepEqual(todoRepository.completedTodos[todo1.id],todo1);
      assert.deepEqual(todoRepository.completedTodos[todo2.id],todo2);
    })
    it('should remove  given todo from liveTodos',function () {
      assert.equal(todoRepository.liveTodos[todo1.id],null);
      assert.equal(todoRepository.liveTodos[todo2.id],null);
    })
    it('should change the status of given todo to done ',function () {
      function isDone(todo) {
        return todoRepository.todos[todo.id].status === 'done';
      }
      assert.isTrue(isDone(todo1));
      assert.isTrue(isDone(todo2));
    })
  })
  describe('markUnDone',function () {
    beforeEach(function () {
      todoRepository.addTodo(todo1);
      todoRepository.addTodo(todo2);
      todoRepository.markUndone(todo2);
      todoRepository.markUndone(todo1);
    })
    it('should add the given todo in liveTodos',function () {
      assert.deepEqual(todoRepository.liveTodos[todo1.id],todo1);
      assert.deepEqual(todoRepository.liveTodos[todo2.id],todo2);
    })
    it('should remove  given todo from completedTodos',function () {
      assert.equal(todoRepository.completedTodos[todo1.id],null);
      assert.equal(todoRepository.completedTodos[todo2.id],null);
    })
    it('should change the status of given todo to undone ',function () {
      function isUndone(todo) {
        return todoRepository.todos[todo.id].status === 'undone';
      }
      assert.isTrue(isUndone(todo1));
      assert.isTrue(isUndone(todo2));
    })
  })
  describe('deleteTodo',function () {
    it('should mark a todo as deleted',function () {
      todoRepository.addTodo(todo1);
      todoRepository.deleteTodo(todo1);
      assert.deepEqual(todoRepository.deletedTodos[todo1.id],todo1);
      assert.equal(todoRepository.liveTodos[todo1.id],null);
    })
  })
})
