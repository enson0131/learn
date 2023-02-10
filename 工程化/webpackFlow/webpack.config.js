/**
 * webpack5 和 webpack4 的调整:
 * 1 热更新由 "webpack-dev-server" 改成 "webpack serve"
 * 2 contentHash 改成 contenthash
 * 3 不支持 HardSourceWebpackPlugin 改成 cache 字段
 * 4 module.rules中loader: ['xxx-loader'] 改成 use: ['xxx-loader']
 */
// webpack构建速度/体积优化
// https://github.com/xccjk/x-blog/issues/26 - webpack5升级的一些坑
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugins = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 该插件将为你生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle
const { VueLoaderPlugin } = require('vue-loader')
// https://segmentfault.com/a/1190000041692954?utm_source=sf-similar-article
// https://www.helloworld.net/p/P2bxtB5tLnCxw
// 采用smp.wrap包裹会导致VueLoaderPlugin报错
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); 
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// webpack5 不支持 hardSourceWebpackPlugin，因为 compiler.hooks 不支持设置属性
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); // https://github.com/mzgoddard/hard-source-webpack-plugin/issues/514
module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, './src/index.js'),
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    //jquery通过script引入之后，全局中即有了 jQuery 变量
    'jquery': 'jQuery'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    noParse: /lodash/, // 对于一些不需要编译转化的第三方依赖，可以通过noParse跳过编译
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      { 
        test: /\.css$/, 
        use: ['vue-style-loader', 'css-loader' ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: ['cache-loader', 'babel-loader']
        // use: ['babel-loader?cacheDiretory=true']
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader', // 配置base64
            options: {
              limit: 5 * 1024, // 5kb的资源都打成base64
            }
          },
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(), // webpack 5 内置了无需配置
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      title: 'Vue 开发环境', // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
      chunks: [
        'index',
        'vendor',
        'common'
      ]
    }),
    // new HardSourceWebpackPlugin(),
    // new HardSourceWebpackPlugin.ExcludeModulePlugin([]), // https://github.com/mzgoddard/hard-source-webpack-plugin/issues/461
    new VueLoaderPlugin(), // 这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
    new SpeedMeasurePlugin(),
    // new BundleAnalyzerPlugin(), // 体积分析
  ],
  // webpack推荐，像压缩类的插件，应该配置在「optimization.minimizer」数组中
  optimization: { 
    minimize: true, // 如果开启了那么webpack的压缩功能会交付给开发者自行定义
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 不将注释提取到单独的文件中，这样的话就不会生成LICENSE.text文件了
      }), // 压缩js
      new OptimizeCssAssetsPlugins({}), // 压缩CSS
    ],
    splitChunks: {
        chunks: 'all',
        cacheGroups: {
            // 第三方模块
            vendor: { 
                name: 'vendor', // chunk名称
                priority: 1, // [praɪˈɒrəti]  权限更高, 越大权重越高
                test: /node_modules/,
                minSize: 0, // 大小限制
                minChunks: 1, // 最少复用过几次
            },
            // 公共模块
            common: {
                name: 'common',
                priority: 0, 
                minSize: 0, // 具体根据业务的情况而定
                minChunks: 2,
            }
        }
    }
  },
  devServer: {
    static: './dist', // 根目录
    compress: true, // 开启Gzip压缩
    hot: true,
    client: { // 在浏览器中以百分比显示编译进度
      progress: true,
    },
    /**
     * Chrome升级到80版本以上会将原来默认值 SameSite=None 修改为SameSite=Lax（其它浏览器，
     * 例如safari，firefox等都有此类似计划），导致跨站cookie无法传递，从而导致类似登录失败等问题。
     * 通用的解决方案是将涉及业务开发的所有域名下的cookie设置成"SameSite=None;Secure;"，但该方案前提条件要求访问协议必须是https，
     * 然而目前前端本地开发大部分都是http，导致请求还是无法携带cookie，因而需要将本地http服务升级为https。
       链接：https://juejin.cn/post/6844904116481687565
     */
    https: {
        key: fs.readFileSync(path.resolve(__dirname, './localhost-key.pem')), // 私钥
        cert: fs.readFileSync(path.resolve(__dirname, './localhost.pem')), // 服务端证书
    },
    proxy: { // 设置代理

    }
  },
  //   cache: { // https://webpack.docschina.org/configuration/cache/#root
  //     type: 'filesystem'
  //   },
  devtool: 'eval-cheap-module-source-map'
}