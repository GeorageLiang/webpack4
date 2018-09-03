const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: {
    page1: path.resolve(__dirname, 'src/app/index.js'),
    vendor: ''
  },
  
  module: {
    rules: [{
      test: /\.(css)$/,
      use: ['style!css'],
      // options: {
      //   data: "$env: " + NODE_ENV + ";"
      // }
    }, {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: path.resolve(__dirname, 'node_modules'),
      query: {
        "presets": ["es2015", "stage-0"],
        // "plugins":["transform-decorators-legacy"]
      },
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].min.css',
      chunkFilename: '[id].[hash].min.css'
    }),
    
  ],
}