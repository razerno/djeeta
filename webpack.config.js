const path = require('path');
const nodeExternals = require('webpack-node-externals');

const common = {
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.scss$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]}
    ]
  }
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