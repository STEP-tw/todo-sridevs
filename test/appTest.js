let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app',()=>{
  describe('GET /nonExistingFile',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/nonExistingFile'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
})
