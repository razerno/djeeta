const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const common = {
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.scss$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};

const client = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js'
  }
};

const server = {
  entry: ["babel-polyfill", "./server/djeeta.js"],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'djeeta.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: true
  }
}

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];