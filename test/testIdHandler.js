const prefix= '../src/';
const IdHandler = require(`${prefix}IdHandler.js`).IdHandler;
const assert = require('chai').assert;

describe('class IdHandler',function () {
  beforeEach(function () {
    idHandler = new IdHandler;
  })
  it('creates an instanceof itself',function () {
    assert.isTrue(idHandler instanceof IdHandler);
  })
  describe('increment',function () {
    it('it increments itself by ')
  })
})
