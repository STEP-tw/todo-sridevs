const prefix= '../src/';
const Crypter = require(`${prefix}crypter.js`);
const assert = require('chai').assert;

var crypter, key, encrypted , decrypted;
describe('Crypter',function () {
  beforeEach(function () {
    key = '*2~4-98';
    crypter = new Crypter(key);
    decrypted = 'abc';
    encrypted = '99*2~4-9898*2~4-9897';
  })

  it('should contain a key',function () {
    assert.propertyVal(crypter,'key',key);
  })

  it('should encrypt the given string',function () {
    let actual = crypter.encrypt(decrypted);
    assert.equal(actual,encrypted);
  })

  it('should decrypt a given code',function () {
    let actual = crypter.decrypt(encrypted);
    assert.equal(actual,decrypted);
  })
})
