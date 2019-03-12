const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve('../../../target/generated-resources/frontend/WEB-INF/public'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
