var expect  = require("chai").expect;
var request = require("request");

describe("Yaz API", function() {
  describe("Get all users endpoints", function() {
    var url = "http://localhost:3000/users";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
