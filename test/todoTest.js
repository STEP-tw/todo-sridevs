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

  describe('markUndone',function () {
    it('should change todo\'s status to undone',function () {
      todo.markUndone();
      assert.equal(todo.status,'undone');
    })
  })

  describe('edit',function () {
    it('should edit title and description',function () {
      let newTitle = 'title changed' ,
          newDesc = 'desc changed';
      todo.edit(newTitle, newDesc);
      assert.equal(todo.title,newTitle);
      assert.equal(todo.description,newDesc)
    })
  })

  describe('delete',function () {
    it('should mark the todos status as deleted',function () {
      assert.equal(todo.delete(),'deleted');
    })
  })

  describe('addTask',function () {
    it('should add task items in the todo',function () {
      let taskTitle = 'test' ,
          taskDesc = 'test of tests',
          task = new Todo(taskTitle,taskDesc);

      assert.deepEqual(todo.addTask(task) , [task]);
    })
  })

  describe.skip('getTask',function () {
    it('should get all the task items of the todo',function () {
      assert.equal
    })
  })
})
