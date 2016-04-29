module.exports = {
  devtool: "#inline-source-map",
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\/node_modules\/react-authenticate\/.*\.jsx?$/, loader: "babel-loader" }
    ]
  }
};
