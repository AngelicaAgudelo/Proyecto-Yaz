const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const url = "http://localhost:3000";

describe("Payment_item Test", function () {
    describe("Insert a 'payment_item' endpoint", function () {
        it('Should insert a payment_item', function (done) {
            chai.request(url)
                .post('/payment_item/')
                .send({ id_payment_item: 123456789, id_client: 9, id_item: 2, payment_item_date: "2008-11-11 13:23:44"})
                .end(function (err, res) {
                    expect(res).to.have.status(201);
                    done();
                });
        });
    });

    describe("Get 'all payment_items' endpoint", function () {
        it("Should return all payment_items", function (done) {
            chai.request(url)
                .get('/payment_item')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe("Get 'one payment_item' endpoint", function () {
        it("Should return a payment_item with id 123456789", function (done) {
            chai.request(url)
                .get('/payment_item/id=123456789')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe("Update 'one payment_item' endpoint", () => {
        it('Should update the payment_item', (done) => {
            chai.request(url)
                .put('/payment_item/id=123456789')
                .send({ payment_item_date: "2020-11-11 13:23:44" })
                .end(function (err, res) {
                    expect(res.body.data).to.have.property('payment_item_date').to.be.equal("2020-11-11 13:23:44");
                    expect(res).to.have.status(201);
                    done();
                });
        });
    });

    describe("Delete 'one payment_item' endpoint", () => {
        it('Should delete the payment_item with id 123456789', (done) => {
            chai.request(url)
                .del('/payment_item/id=123456789')
                .end(function (err, res) {
                    expect(res.body.data).to.be.equal(1);
                    expect(res).to.have.status(200)
                    done();
                });
        });
    });
});
