const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
const request = require("request");

chai.use(chaiHttp);
const url = "http://localhost:3000";

describe("Yaz API", function () {
  describe("Get all users endpoints", function () {
    it("returns status 200", function (done) {
      chai.request(url)
        .get('/users')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Insert a user', function () {
    it('should insert a user', function (done) {
      chai.request(url)
        .post('/users')
        .send({ user_name: "Jhon Doe", user_type: 0, user_password: "jhon", user_email: "jhon@doe.com" })
        .end(function (err, res) {
          console.log(res.body)
          expect(res).to.have.status(201);
          done();
        });
    });
  });
});
