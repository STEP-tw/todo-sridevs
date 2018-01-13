let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
process.env.PUBLICDIRPATH = './src/public/'
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
  describe('GET /homePage.html',()=>{
    it('loads homePage.html',done=>{
      request(app,{method:'GET' ,url:'/homePage.html'}, (res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Welcome to Todoster');
        done();
      })
    })
  })
  describe('GET /logout',()=>{
    it('redirects to loginPage',done=>{
      request(app,{method:'GET',url:'/logout'},(res)=>{
        th.should_be_redirected_to(res,'/');
        assert.equal(res.body,"");
        done();
      })
    })
  })
  describe('GET /viewList.html',()=>{
    it('loads lists of todos',done=>{
      request(app,{method:'GET',url:'/viewList.html'},(res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Todo\'s');
        done();
      })
    })
  })
  describe('GET /css/style',()=>{
    it('loads stylesheet',done=>{
      request(app,{method:'GET',url:'/css/style.css'},(res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/css');
        done();
      })
    })
  })
})
