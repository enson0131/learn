class Rectangle {

    constructor(w, h) {
      this.w = w;
      this.h = h;
    }
  
    getArea() {
      return () => {
        return this.w * this.h;
      };
    }
  }

  const a = new Rectangle(1, 2)
  const b = { w: 3, h:4, fn: a.getArea()}
  b.fn()