const prefix= '../src/';
const User = require(`${prefix}user.js`).User;
const TodoRepository = require(`${prefix}todoRepository.js`).TodoRepository;
const assert = require('chai').assert;

var user;

describe('User',function () {
  beforeEach(function () {
    user = new User('sridev');
  })

  it('should contain a unique Id',function () {
    assert.property(user,'id');
  })

  it('should contain name',function () {
    assert.propertyVal(user,'name','sridev');
  })

  it('should contain a todo repository',function () {
    assert.deepPropertyVal(user,'todoRepository',new TodoRepository);
  })

  describe('addRepo',function () {
    it('should add a repository',function () {
      let repo = {todos: {}, completedTodos: {}};
      user.addRepo(repo);
      assert.deepEqual(user.todoRepository,repo);
    })
  })

  describe('emptyRepo',function () {
    it('should clear repository',function () {
      let repo = {todos: {}, completedTodos: {}};
      user.addRepo(repo);
      user.emptyRepo();
      assert.deepEqual(user.todoRepository,{});
    })
  })

  describe('addTodo',function () {
    it('should be able to add a todo',function () {
      let todo = {id: 1,hi: 'hello'};
      user.addTodo(todo);
      assert.deepNestedPropertyVal(user,'todoRepository.todos',{1: todo});
      assert.deepNestedPropertyVal(user,'todoRepository.liveTodos',{1: todo});
    })
  })

  describe('liveTodos',function () {
    it('should show the current todos',function () {
      let todo = {id: 1,hi: 'hello'};
      user.addTodo(todo);
      assert.deepEqual(user.liveTodos, user.todoRepository.liveTodos);
    })
  })
})
