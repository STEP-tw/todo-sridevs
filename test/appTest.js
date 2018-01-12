let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let app = require('../src/app.js');
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
  describe('GET /',()=>{
    it('loads login page',done=>{
      request(app,{method:'GET' ,url:'/'}, (res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Login');
        done();
      })
    })
  })
})
