const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const url = "http://localhost:3000";

describe("Payment_service Test", function () {
    describe("Insert a 'payment_service' endpoint", function () {
        it('Should insert a payment_service', function (done) {
            chai.request(url)
                .post('/payment_service/')
                .send({ id_payment_service: 123456789, id_service: 9, payment_date: "2008-11-11 13:23:44"})
                .end(function (err, res) {
                    expect(res).to.have.status(201);
                    done();
                });
        });
    });

    describe("Get 'all payment_services' endpoint", function () {
        it("Should return all payment_services", function (done) {
            chai.request(url)
                .get('/payment_service')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe("Get 'one payment_service' endpoint", function () {
        it("Should return a payment_service with id 123456789", function (done) {
            chai.request(url)
                .get('/payment_service/id=123456789')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe("Update 'one payment_service' endpoint", () => {
        it('Should update the payment_service', (done) => {
            chai.request(url)
                .put('/payment_service/id=123456789')
                .send({ id_service: 5 })
                .end(function (err, res) {
                    expect(res.body.data).to.have.property('id_service').to.be.equal(5);
                    expect(res).to.have.status(201);
                    done();
                });
        });
    });

    describe("Delete 'one payment_service' endpoint", () => {
        it('Should delete the payment_service with id 123456789', (done) => {
            chai.request(url)
                .del('/payment_service/id=123456789')
                .end(function (err, res) {
                    expect(res.body.data).to.be.equal(1);
                    expect(res).to.have.status(200)
                    done();
                });
        });
    });
});
