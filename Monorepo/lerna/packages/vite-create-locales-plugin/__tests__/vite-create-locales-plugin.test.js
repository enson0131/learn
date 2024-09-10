'use strict';

const viteCreateLocalesPlugin = require('..');
const assert = require('assert').strict;

assert.strictEqual(viteCreateLocalesPlugin(), 'Hello from viteCreateLocalesPlugin');
console.info('viteCreateLocalesPlugin tests passed');
