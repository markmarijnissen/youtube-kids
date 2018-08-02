const path = require("path");

module.exports = {
  pwa: {
    name: "YouTube Kids",
    themeColor: "#FF0000",
    workboxOptions: {
      // include: [
      //   "https://fonts.googleapis.com/icon?family=Material+Icons",
      //   "https://cdn.muicss.com/mui-0.9.39/css/mui.min.css",
      //   "https://cdn.muicss.com/mui-0.9.39/js/mui.min.js"
      // ],
      // // Define runtime caching rules.
      // runtimeCaching: [
      //   {
      //     // Match any request ends with .png, .jpg, .jpeg or .svg.
      //     urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

      //     // Apply a cache-first strategy.
      //     handler: "cacheFirst",

      //     options: {
      //       // Use a custom cache name.
      //       cacheName: "images",

      //       // Only cache 10 images.
      //       expiration: {
      //         maxEntries: 10
      //       }
      //     }
      //   }
      // ]
    }
  },
  css: {
    loaderOptions: {
      sass: {
        includePaths: [path.resolve(__dirname, "node_modules")]
      }
    }
  }
};
