const path = require("path");

module.exports = {
  pwa: {
    name: "YouTube Kids",
    themeColor: "#FF0000"
  },
  css: {
    loaderOptions: {
      sass: {
        includePaths: [path.resolve(__dirname, "node_modules")]
      }
    }
  }
};
