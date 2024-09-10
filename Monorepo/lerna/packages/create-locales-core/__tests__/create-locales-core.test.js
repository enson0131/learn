'use strict';

const createLocalesCore = require('..');
const assert = require('assert').strict;

assert.strictEqual(createLocalesCore(), 'Hello from createLocalesCore');
console.info('createLocalesCore tests passed');
