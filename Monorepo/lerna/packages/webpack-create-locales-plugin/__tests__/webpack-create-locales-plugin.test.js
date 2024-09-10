'use strict';

const webpackCreateLocalesPlugin = require('..');
const assert = require('assert').strict;

assert.strictEqual(webpackCreateLocalesPlugin(), 'Hello from webpackCreateLocalesPlugin');
console.info('webpackCreateLocalesPlugin tests passed');
