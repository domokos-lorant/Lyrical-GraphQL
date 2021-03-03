const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
     app: ['./client/src/index.tsx', 'webpack-hot-middleware/client'],
     vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
         test: /\.(ts|tsx)$/,
         loader: 'ts-loader'
      },
     { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: [
   new HtmlWebpackPlugin({ 
      template: path.resolve(__dirname, 'client', 'src', 'index.html') 
   }),
   new webpack.HotModuleReplacementPlugin()
  ]
};