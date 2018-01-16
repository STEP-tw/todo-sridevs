const prefix= '../src/';
const IdHandler = require(`${prefix}IdHandler.js`).IdHandler;
const assert = require('chai').assert;

describe('class IdHandler',function () {
  beforeEach(function () {
    idHandler = new IdHandler;
    idHandler2 = new IdHandler(1,2);
  })
  it('creates an instanceof itself',function () {
    assert.isTrue(idHandler instanceof IdHandler);
  })
  describe('increment',function () {
    it('increments itself by 1',function () {
      idHandler.increment();
      assert.equal(idHandler.id,1);
      idHandler.increment();
      assert.equal(idHandler.id,2);
      idHandler.increment();
      assert.equal(idHandler.id,3);
    })

    it('increments itself by given addend',function () {
      idHandler2.increment()
      assert.equal(idHandler2.id,3);
      idHandler2.increment();
      assert.equal(idHandler2.id,5);
    })
  })

  describe('reset',function () {
    it('resets its id to initialValue',function () {
      idHandler2.increment();
      assert.equal(idHandler2.id,3);
      idHandler2.reset();
      assert.equal(idHandler2.id,1);
    })
  })

  describe('generateId',function () {
    it('generates a new id in ascending order',function () {
      assert.equal(idHandler.generateId(),1);
      assert.equal(idHandler.generateId(),2);
      assert.equal(idHandler.generateId(),3);
    })
  })
})
