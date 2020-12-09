const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const url = "http://localhost:3000";

describe("User Test", function () {
  describe("Get 'all users' endpoint", function () {
    it("Should return all users", function (done) {
      chai.request(url)
        .get('/users')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("Insert a 'user' endpoint", function () {
    it('Should insert a user', function (done) {
      chai.request(url)
        .post('/users')
        .send({ id_user: 2, user_name: "Jhon Doe", user_type: 0, user_password: "jhon", user_email: "juan@doe.com" })
        .end(function (err, res) {
          expect(res).to.have.status(201);
          done();
        });
    });
  });

  describe("Get 'one user' endpoint", function () {
    it("Should return a user with id 2", function (done) {
      chai.request(url)
        .get('/users/id=2')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("Update 'one user' endpoint", () => {
    it('Should update the user phone number', (done) => {
      chai.request(url)
        .put('/users/id=2')
        .send({ user_phone: 123456789 })
        .end(function (err, res) {
          expect(res.body.data).to.have.property('user_phone').to.be.equal(123456789);
          expect(res).to.have.status(201);
          done();
        });
    });
  });

  describe("Delete 'one user' endpoint", () => {
    it('Should delete the user with id 2', (done) => {
      chai.request(url)
        .del('/users/id=2')
        .end(function (err, res) {
          expect(res.body.data).to.be.equal(1);
          expect(res).to.have.status(200)
          done();
        });
    });
  });
});
