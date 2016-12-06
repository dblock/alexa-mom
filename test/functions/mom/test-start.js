require('../../setup');

describe('alexa', function() {
    startIntentRequest = function(cb) {
        chai.request(server)
            .post('/alexa/mom')
            .send(require('./fixtures/StartIntentRequest.json'))
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                var data = JSON.parse(res.text);
                expect(data.response.outputSpeech.type).to.equal('SSML')
                cb(data.response);
            });
    }

    it('starts', function(done) {
        startIntentRequest(function(response) {
            expect(response.outputSpeech.ssml).to.equal("<speak>I'm your mom, Alexa, ask mom to buy me an elephant.</speak>");
            expect(response.shouldEndSession).to.equal(true);
            done();
        });
    });
});
