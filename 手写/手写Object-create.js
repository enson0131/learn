function createObj(o) { // Object.create原理
    function F(){}
    F.prototype = o;
    return new F();
}