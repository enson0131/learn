module.exports = {
    presets: [
        [
          '@babel/preset-env', // es6转es5语法
          { // 适用于项目
            useBuiltIns: 'usage', // usage-按需引入 entry-入口引入（整体引入） false-不引入polyfill
            corejs: 3,  // 3-corejs@3 npm install core-js@3 --save 参考: https://www.babeljs.cn/docs/babel-preset-env
            // targets: ['> 0.5%', 'last 2 versions', 'ie >= 8', 'Android >= 4.0', 'iOS >= 8'],
          },
        ],
    ],
    plugins: [
        // ['@babel/plugin-transform-runtime', { corejs: 3 }], // 转api - 适用于类库
    ]
}