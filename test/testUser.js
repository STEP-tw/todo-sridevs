const prefix= '../src/';
const User = require(`${prefix}user.js`).User;
const assert = require('chai').assert;

var user;

describe('User',function () {
  beforeEach(function () {
    user = new User;
  })

  it('should create an instance of itself',function () {
    assert.isTrue(user instanceof User);
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

})
