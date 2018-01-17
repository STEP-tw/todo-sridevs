const Item = require('../src/item.js').Item;
const assert = require('chai').assert;

var item;

describe('Item',function () {
  beforeEach(function () {
    item = new Item('sridev','hi','hello');
  })

  describe('Item class',function () {
    it('should construct an instance',function () {
      assert.isTrue(item instanceof Item);
    })
  })

  describe('markDone',function () {
    it('should change item\'s status to done',function () {
      item.markDone();
      assert.equal(item.status, 'done');
    })
  })

  describe('markUndone',function () {
    it('should change item\'s status to undone',function () {
      item.markUndone();
      assert.equal(item.status,'undone');
    })
  })

  describe('edit',function () {
    it('should edit title and description',function () {
      let newTitle = 'title changed' ,
          newDesc = 'desc changed';
      item.edit(newTitle, newDesc);
      assert.equal(item.title,newTitle);
      assert.equal(item.description,newDesc)
    })
  })

  describe('delete',function () {
    it('should mark the items status as deleted',function () {
      assert.equal(item.markDeleted(),'deleted');
    })
  })
})
