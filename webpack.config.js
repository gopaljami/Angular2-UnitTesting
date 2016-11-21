var webpack=require('webpack');
var HtmlWebPackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var helpers=require('./helpers');
module.exports={
    entry:{
    'app': './src/main.ts',
    'polyfills': [
      'core-js/es6',
      'core-js/es7/reflect',
      'zone.js/dist/zone'
    ]
    },
    module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts!angular2-template' },
    //{test: /\.ts$/, exclude: /\.ts$/, loader: 'ts'},      
      {test: /\.html$/, loader: 'raw'},
      {test: /\.css$/, loader: 'raw'}
    ]
  },
    output:{
        path: './dist',
        filename: '[name].[hash].js'
    },
    resolve: {
    extensions: ['', '.js', '.ts', '.html', '.css']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills'
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
      }
    })
  ]
  
};