var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var demoPath = path.join(__dirname, 'demo');
var srcPath = path.join(__dirname, 'src');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    path.resolve(demoPath, 'index.js')
  ],

  output: {
    path: path.resolve(demoPath, 'bundle'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: ['json'],
        include: path.join(__dirname, 'package.json')
      },

      {
        test: /\.jsx?$/,
        loaders: ['react-hot','babel'],
        include: [demoPath, srcPath]
      },

      {
        test: /\.less$/,
        loader: 'style!css!less',
        include: demoPath
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader:'file',
        include: demoPath
      },

      {
        test: /\.md$/,
        loader:'html!markdown?gfm=false',
        include: path.join(__dirname, 'README.md')
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__ : (process.env.NODE_ENV !== 'production')
    }),
    new webpack.DefinePlugin({
      GA_TRACKING_CODE: JSON.stringify('UA-59444321-3')
    }),
    new HtmlWebpackPlugin({
      title: 'React Plan',
      template: path.join(demoPath, 'index.tpl.html')
    })
  ]

};