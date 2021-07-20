"use strict";

var prod = process.env.NODE_ENV === 'production';

var HtmlWebpackPlugin = require('html-webpack-plugin');

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var TerserPlugin = require('terser-webpack-plugin');

var path = require('path');

module.exports = {
  mode: prod ? 'production' : 'development',
  optimization: {
    minimizer: [new TerserPlugin({
      /* additional options here */
    })]
  },
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
      },
      use: 'ts-loader'
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    }, {
      test: /\.s[ac]ss$/i,
      use: [// Creates `style` nodes from JS strings
      'style-loader', // Translates CSS into CommonJS
      'css-loader', // Compiles Sass to CSS
      'sass-loader']
    }]
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html'
  }), new MiniCssExtractPlugin()]
};