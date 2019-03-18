const path = require('path');

module.exports = {
  entry: './src/main/frontend/index.tsx',
  output: {
    path: path.resolve('./target/generated-resources/frontend/WEB-INF/public'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
};
