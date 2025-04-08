class Adapter {
  middlewares = []; // 用来存储中间件的数组

  use(middleware) {
    this.middlewares.push(middleware);
  }

  // 运行中间件
  async runMiddlewares(response) {
    let index = -1;
    const next = async () => {
      index++;
      if (index < this.middlewares.length) {
        await this.middlewares[index](response, next);
      }
    };
    next();
  }
}

const adapter = new Adapter();
adapter.use(async (response, next) => {
  console.log("middleware 1");
  await next();
  console.log("middleware 1 结束");
});

adapter.use(async (response, next) => {
  console.log("middleware 2");
  await next();
  console.log("middleware 2 结束");
});

adapter.runMiddlewares({});

/**
    middleware 1
    middleware 2
    middleware 2 结束
    middleware 1 结束
 */
