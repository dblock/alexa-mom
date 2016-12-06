var alexa = require('alexa-app');
var app = new alexa.app('mom');
var _ = require('underscore');

console.log('Loaded Mom.');

module.change_code = 1; // allow this module to be reloaded by hotswap when changed

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.launch(function(req, res) {
    console.log('app.launch');
    var randomInt = getRandomInt(1, 100);
    res
        .session('number', randomInt)
        .say("I'm your mom. My number is " + randomInt + ". Say start " + randomInt + " if you want me to start.")
        .shouldEndSession(false)
        .send();
});

app.intent('AMAZON.StopIntent', {
        "slots": {},
        "utterances": [
            "stop"
        ]
    },
    function(req, res) {
        console.log('app.AMAZON.StopIntent');
        res.clearSession('number');
        res.say("Goodbye.");
        res.send();
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
        res.clearSession('number');
        res.say("Goodbye.");
        res.send();
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
        res.clearSession('number');
        res.say("I'm your mom.");
        res.shouldEndSession(false);
        res.send();
    }
);

app.intent('StartIntent', {
        "slots": {
            "number" : "AMAZON.NUMBER"
        },
        "utterances": [
            "start {1-100|number}"
        ]
    },
    function(req, res) {
        var sessionNumber = req.session('number');
        if (sessionNumber == req.slot('number')) {
            res.say("I'm your mom, Alexa, ask mom to buy me an elephant.")
            res.shouldEndSession(true);
            res.send();
        } else {
            res.shouldEndSession(true);
        }
    }
);

app.intent('MomIntent', {
        "slots": {},
        "utterances": [
            "to buy me an elephant"
        ]
    },
    function(req, res) {
        res.say("I'm not buying you an elephant, Alexa. Ask mom to buy me an elephant.");
        res.shouldEndSession(true);
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
