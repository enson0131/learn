function Parent() {
  this.name = 'parent';
}

function Children() {
  Parent.call(this);
}

Children.prototype = new Parent();
// 需要重新设置子类的constructor，Child.prototype = new Parent()相当于子类的原型对象完全被覆盖了
Childon.prototype.constructor = Childon;