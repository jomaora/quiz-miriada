'use strict';

var supertest = require('supertest');
var expect = require('chai').expect;
var request = supertest.agent('http://localhost:' + 5000);

describe('GET /user', function(){
    it('respond with json', function(done){
        request
            .get('/quizes')
            .end(function(err, res) {
                console.log('res', res);
                expect(res).to.have.property('status', 200);
                done();
            })
        ;
    });
});

