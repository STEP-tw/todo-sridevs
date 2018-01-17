const prefix= '../src/';
const User = require(`${prefix}user.js`).User;
const assert = require('chai').assert;

var user;

describe('User',function () {
  beforeEach(function () {
    user = new User;
  })

  it('should contain a unique Id',function () {
    assert.property(user,'id');
  })

  it('should contain name',function () {
    assert.propertyVal(user,'name','');
  })

  it('should contain a todo repository',function () {
    assert.deepPropertyVal(user,'todoRepository',{});
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
})
