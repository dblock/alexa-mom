require('./setup');

describe('alexa-app-server', function() {
  it('should respond as Mom', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.equal("Mom\n");
        done();
      });
  });
});
