require('../../setup');

describe('alexa', function() {
    momIntentRequest = function(cb) {
        chai.request(server)
            .post('/alexa/mom')
            .send(require('./fixtures/MomIntentRequest.json'))
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                var data = JSON.parse(res.text);
                expect(data.response.outputSpeech.type).to.equal('SSML')
                cb(data.response);
            });
    }

    it('asks a rhetorical question', function(done) {
        momIntentRequest(function(response) {
            expect(response.outputSpeech.ssml).to.equal("<speak>I'm not buying you an elephant, Alexa. Ask mom to buy me an elephant.</speak>");
            expect(response.shouldEndSession).to.equal(true);
            done();
        });
    });
});
