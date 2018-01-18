const Todo = require('../src/todo.js');
const assert = require('chai').assert;

var todo;

describe('Todo',function () {
  beforeEach(function () {
    todo = new Todo('title','description');
  })

  describe('Todo class',function () {
    it('should have an id',function () {
      assert.property(todo,'id');
    })

    it('should have a title',function () {
      assert.propertyVal(todo,'title','title');
    })

    it('should have a description',function () {
      assert.propertyVal(todo,'description','description');
    })

    it('should have a status',function () {
      assert.propertyVal(todo,'status','undone');
    })

    it('should have a list of tasks',function () {
      assert.deepPropertyVal(todo,'tasks',[]);
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
      assert.equal(todo.markDeleted(),'deleted');
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

  describe('get allTask',function () {
    it('should get all the task items of the todo',function () {
      assert.deepEqual(todo.allTasks,[]);
    })
  })
})
