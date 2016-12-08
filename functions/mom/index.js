var alexa = require('alexa-app');
var app = new alexa.app('mom');
var _ = require('underscore');

console.log('Loaded Mom.');

module.change_code = 1; // allow this module to be reloaded by hotswap when changed

app.launch(function(req, res) {
    console.log('app.launch');
    res
        .say("I'm your mom. Say start.")
        .shouldEndSession(false)
});

app.intent('AMAZON.StopIntent', {
        "slots": {},
        "utterances": [
            "stop"
        ]
    },
    function(req, res) {
        console.log('app.AMAZON.StopIntent');
        res.say("Goodbye.");
    }
);

app.intent('AMAZON.CancelIntent', {
        "slots": {},
        "utterances": [
            "cancel"
        ]
    },
    function(req, res) {
        console.log('app.AMAZON.CancelIntent');
        res.say("Goodbye.");
    }
);

app.intent('AMAZON.HelpIntent', {
        "slots": {},
        "utterances": [
            "help"
        ]
    },
    function(req, res) {
        console.log('app.AMAZON.HelpIntent');
        res
            .say("I'm your mom.")
            .shouldEndSession(false)
    }
);

app.intent('StartIntent', {
        "slots": {},
        "utterances": [
            "start"
        ]
    },
    function(req, res) {
        res.say("I'm your mom, Alexa, ask mom to buy me an elephant.")
    }
);

app.intent('MomIntent', {
        "slots": {},
        "utterances": [
            "to buy me an elephant"
        ]
    },
    function(req, res) {
        res.say("I'm not buying you an elephant, Alexa. Ask mom to buy me an elephant.")
    }
);

if (process.env['ENV'] == 'lambda') {
    console.log("Starting Mom on AWS lambda.")
    exports.handle = app.lambda();
} else if (process.env['ENV'] == 'development') {
    console.log("Starting Mom in development mode.")
    module.exports = app;
} else {
    var fs = require('fs');
    fs.writeFileSync('schema.json', app.schema());
    fs.writeFileSync('utterances.txt', app.utterances());
    console.log('Schema and utterances exported.');
}
