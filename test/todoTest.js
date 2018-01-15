const Todo = require('../src/todo.js').Todo;
const assert = require('chai').assert;

describe('Todo',function () {
  beforeEach(function () {
    todo = new Todo('sridev','hi','hello');
  })

  describe('Todo class',function () {
    it('should construct an instance',function () {
      assert.isTrue(todo instanceof Todo);
    })
  })

  describe('markDone',function () {
    it('should change todo\'s status to done',function () {
      todo.markDone();
      assert.equal(todo.status, 'done');
    })
  })

})
