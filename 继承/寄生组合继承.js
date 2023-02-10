function Parent() {
  this.name = 'parent';
}

function Childon() {
  Parent.call(this);
}

Childon.prototype = Object.create(Parent.prototype);
Childon.prototype.constructor = Childon;