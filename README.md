# Introduction

An ultra lightweight test fake implementation of the redis client returned from the fantastic [redis](https://www.npmjs.com/package/redis) package.

What's a test fake? Check out [this](https://8thlight.com/blog/uncle-bob/2014/05/14/TheLittleMocker.html) short blog.

# Usage

Install the module and save as a dev dependency

```bash
npm install redis-fake --save-dev
```

Import or require into your test code

```javascript

import redisClientFakeFactory from 'redis-fake';

const redisClientFake = redisClientFakeFactory();

// now use the fake anywhere you would have used a redis client 

```

You can also take a look at the unit tests for more examples of usage.

# Redis Functionality Currently Faked

The following functionality has been faked, admittedly there isn't much yet. Pretty much just enough to support my own testing so far. I will continue to build out more support as I needed, feel free to contribute.

[API Docs](https://jrobison153.github.io/redis-fake/index.html)