# Mom

[![Build Status](https://travis-ci.org/dblock/alexa-mom.svg?branch=master)](https://travis-ci.org/dblock/alexa-mom)

### Experiment

Can we make two Alexa talk to each other?

#### Current Implementation

- Human: Alexa, open Mom.
- One: I'm your mom. My number is 24. Say 24 if you want me to start.
- Two: I'm your mom. My number is 12. Say 12 if you want me to start.
- Human: 24
- One: I'm leading ... Alexa, ask Mom to buy me an elephant.
- Two: (says nothing, closes session)
- Two: I'm not buying you an elephant, Alexa, ask mom to buy me an elephant.
- One: I'm not buying you an elephant, Alexa, ask mom to buy me an elephant.

### Deploying to AWS Lambda

See [DEPLOYMENT](DEPLOYMENT.md).

### Contributing

See [CONTRIBUTING](CONTRIBUTING.md).

### License

Copyright (c) 2016 Daniel Doubrovkine

MIT License, see [LICENSE](LICENSE.md) for details.
