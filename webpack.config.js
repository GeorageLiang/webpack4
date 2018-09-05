const path = require("path");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const node_env = process.env.NODE_ENV || 'production';
const isDev = node_env === 'development';

const config = {
  entry: {
    page1: path.resolve('src/app/index.js'),
    // vendor: ''
  },
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  mode: node_env,
  devtool: isDev ? 'source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  //   //optimization.splitChunks 和 optimization.runtimeChunk ?? js共同代码提取
  // },
  module: {
    rules: [{
      test: /\.(css|scss)$/,
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader', options: {
            sourceMap: isDev
          }
        },
        {
          loader: 'sass-loader', options: {
            sourceMap: isDev
          }
        },
      ]
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10
          }
        }
      ]
    }, {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }],
      exclude: path.resolve('node_modules'),
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader', options: {
          // limit: 8192
          limit: 10
        }
      }]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify(node_env)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('src/app/index.html')
    }),
  ],
};

if (isDev) {
  // development
  config.devServer = {
    contentBase: path.resolve('src/app'),
    inline: true,
    hot: true,
    port: 3005,
    overlay: true,
    stats: "errors-only",
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  );
} else {
  // production
  config.plugins.push(
    new UglifyJsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  );
}
module.exports = config;
