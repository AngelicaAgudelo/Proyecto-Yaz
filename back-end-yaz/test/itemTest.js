const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const url = "http://localhost:3000";

describe("Item Test", function () {
    describe("Insert a 'item' endpoint", function () {
        it('Should insert a item', function (done) {
            chai.request(url)
                .post('/item')
                .send({ id_item: 123456789, item_name: "Item", item_photo: "photo.png", item_quantity: 10, item_price: 50000 })
                .end(function (err, res) {
                    expect(res).to.have.status(201);
                    done();
                });
        });
    });

    describe("Get 'all items' endpoint", function () {
        it("Should return all items", function (done) {
            chai.request(url)
                .get('/item')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe("Get 'one item' endpoint", function () {
        it("Should return a item with id 123456789", function (done) {
            chai.request(url)
                .get('/item/id=123456789')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe("Update 'one item' endpoint", () => {
        it('Should update the item quantity', (done) => {
            chai.request(url)
                .put('/item/id=123456789')
                .send({ item_quantity: 5 })
                .end(function (err, res) {
                    expect(res.body.data).to.have.property('item_quantity').to.be.equal(5);
                    expect(res).to.have.status(201);
                    done();
                });
        });
    });

    describe("Delete 'one item' endpoint", () => {
        it('Should delete the item with id 123456789', (done) => {
            chai.request(url)
                .del('/item/id=123456789')
                .end(function (err, res) {
                    expect(res.body.data).to.be.equal(1);
                    expect(res).to.have.status(200)
                    done();
                });
        });
    });
});
