"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var myInterval = (0, rxjs_1.interval)(1000);
var bufferBy = (0, rxjs_1.fromEvent)(document, "click");
var myBufferedInterval = myInterval.pipe((0, operators_1.buffer)(bufferBy));
var subject = myBufferedInterval.subscribe(function (data) {
    console.log("Buffered values: ", data);
});
