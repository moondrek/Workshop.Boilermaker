module.exports = {
  entry: "./client/src/index.js",
  mode: "development",
  output: {
    path: __dirname + "/client/dist",
    filename: "bundle.js",
  },
  devtool: "source-maps",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
};
