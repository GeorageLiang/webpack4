const path = require("path");
const webpack = require("webpack");
const node_env = process.env.NODE_ENV || 'production';
const isDev = node_env === 'development';
const config = {
  entry: path.resolve('src/app/index.js'),
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  mode: node_env,
  // devtool: isDev ? 'source-map' : 'eval',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['css-loader', 'style-loader'],
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify(node_env)
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

if (isDev) {
  config.devServer = {
    contentBase: path.resolve('src/app'),
    inline: true,
    hot: true,
    port: 3005,
    overlay: true,
    stats: "errors-only",
  }
}
module.exports = config;
