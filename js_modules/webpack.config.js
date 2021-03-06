const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 *    Module              |   Purpose
 *  ----------------------|---------------
 *  babel-loader          |   Teaches babel how to work with webpack
 *  babel-core            |   Knows how to take in code, parse it, and generate some output files
 *  babel-preset-env      |   Ruleset for telling babel exactly what pieces of ES6/7/8 syntax to look for, and how to turn it into ES5 code
 *                        |
 *  css-loader            |   Knows how to deal with CSS imports (open the file and read the content).
 *  style-loader          |   Takes the CSS imports (content) and adds them to the HTML document under <style> tag.
 *                        |
 *  image-webpack-loader  |   compress the image
 *  url-loader            |   look at the compressed image, and if it's small than limit, include it in bundle as raw, base64 URIs, if it's big, file-loader is used to include the image in the build directory,
 *                            and replace the original asset import url with new url (e.g e26a49023a771b66c33b0604f567de49.jgp and prepend publicPath, e,g, build/ to it)
 */

 
 /**
  *   Difference between Loaders and Plugins: 
  *
  *   Loaders: work at the individual file level during or before the bundle is generated.
  *   Plugins: work at bundle or chunk level and usually work at the end of the bundle generation process. Plugins can also modify how the bundles themselves are created. 
  *      Plugins have more powerful control than loaders.
  * 
  *   https://stackoverflow.com/questions/37452402/webpack-loaders-vs-plugins-whats-the-difference
  */

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'build/'
  },
  module: {
    rules: [
      {
        // do preprocessing before webpack do the work linking source code into bundle.js
        use: 'babel-loader',
        test: /\.js$/ //only process .js files
      }, 
      {
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          }, 
          'css-loader'
        ],
        test: /\.css$/
      },
      { 
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 } // 40kb
          },
          'image-webpack-loader'
        ],
        test: /\.(jpe?g|png|gif|svg)$/
      } 
    ]
  },
  plugins: [
    // tells MiniCssExtractPlugin library to take any files transformed/processed by css-loader and save it into style.css 
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
};

module.exports = config