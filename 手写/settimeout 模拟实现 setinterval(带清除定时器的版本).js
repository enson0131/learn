function mySetTimeOut(fn, delay = 300) {
    let timer;
    const _fn = () => {
      fn();
      timer = setTimeout(_fn(), delay);
    };

    _fn();

    return {
      clear: () => {
        clearTimeout(timer);
      },
    };
  }