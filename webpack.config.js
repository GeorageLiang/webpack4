const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  entry: {
    page1: path.resolve(__dirname, 'src/app/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src/app'),
    inline: true,
    hot: true,
    port: 3005,
    overlay: true,
  },
  module: {
    rules: [{
      test: /\.css$/, use: 'style!css!sass',
      options: {
        data: "$env: " + process.env.NODE_ENV + ";"
      }
    }, {
      test: /\.js$/, use: 'bable',
      exclude: path.resolve(__dirname, 'node_modules')
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({}),
  ],
}