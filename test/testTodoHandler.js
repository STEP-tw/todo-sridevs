const TodoHandler = require('../src/TodoHandler.js').TodoHandler;
const assert = require('chai').assert;

var todoHandler;

describe('TodoHandler',function () {
  beforeEach(function () {
    todoHandler = new TodoHandler;
  })
  it('should create an instance of it',function () {
    assert.isTrue(todoHandler instanceof TodoHandler);
  })
})
