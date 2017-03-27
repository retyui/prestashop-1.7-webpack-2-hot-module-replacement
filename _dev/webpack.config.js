var ref;
const HOT = ((ref = module.parent.filename) != null ? ref.indexOf('hot.webpack.js') : void 0) !== -1;
console.log('Webpack HOT : ',HOT,'\n');

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var plugins = [];

var production = false;

if (production) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
}
if (HOT) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

plugins.push(
  new ExtractTextPlugin(
    path.join('..', 'css', 'theme.css')
    ,{
      disable: HOT // if hot enabled disable ExtractTextPlugin
    }
  )
);

let addHOT = (arr, disable) => {
  if (HOT) {
    arr.unshift('webpack/hot/dev-server', 'webpack-hot-middleware/client');
  }
  return arr;
};

module.exports = {
  entry: {
    theme: addHOT(['./js/theme.js'])
  },
  output: {
    path: path.resolve(__dirname + '/../assets/js'),
    filename: 'theme.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: (HOT? ['monkey-hot-loader','babel-loader']: ['babel-loader'])
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        "style",
        "css?sourceMap!postcss!sass?sourceMap"
      )
    }, {
      test: /.(png|woff(2)?|eot|ttf|svg|jpe?g)(\?[a-z0-9=\.]+)?$/,
      loader: 'file-loader?name=../css/[hash].[ext]'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        "style",
        "css?sourceMap!postcss"
      )
    }]
  },
  postcss: function() {
    return [require('postcss-flexibility')];
  },
  externals: {
    prestashop: 'prestashop',
    $: '$',
    jquery: 'jQuery'
  },
  devtool: HOT ? 'cheap-module-inline-source-map' : 'source-map',
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.scss']
  }
};
