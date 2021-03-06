var ref, HOT = ((ref = module.parent.filename) != null ? ref.indexOf('hot.webpack.js') : void 0) !== -1;
console.log('Webpack HOT : ', HOT, '\n');

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
	new webpack.ProvidePlugin({
		'Popper': 'popper.js'
	})
);

plugins.push(
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
		// HOT: HOT,
		// lang: JSON.stringify('en')
	})
);

plugins.push(
	new ExtractTextPlugin({
		filename: path.join('..', 'css', 'theme.css'),
		allChunks: true,
		disable: HOT // if hot enabled disable ExtractTextPlugin
	})
);

// if (!production) {
// 	plugins.unshift(new(require('hard-source-webpack-plugin'))({
// 		cacheDirectory: path.resolve(__dirname, './tmp/hard-plugin/[confighash]')
// 		, recordsPath: path.resolve(__dirname, './tmp/hard-plugin/[confighash]/records.json')
// 		, configHash: function(webpackConfig) {
// 			return require('node-object-hash')().hash(webpackConfig);
// 		}
// 		, environmentHash: {
// 			root: process.cwd()
// 			, directories: ['node_modules']
// 			, files: ['package.json']
// 		}
// 	}))
// }

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
		filename: '[name].js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						['env', {
							modules: false
								// ,targets: {
								//   browsers: ['last 2 versions', 'safari 7']
								// }
						}]
					],
					plugins: ['syntax-dynamic-import']
				}
			}
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						importLoaders: 2
					}
				}, {
					loader: 'postcss-loader'
				}, {
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}]
			})
		}, {
			test: /.(png|woff(2)?|eot|ttf|svg|jpe?g)(\?[a-z0-9=\.]+)?$/,
			loader: 'file-loader?name=../css/[hash].[ext]'
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						importLoaders: 1
					}
				}, {
					loader: 'postcss-loader'
				}]
			})
		}]
	},
	externals: {
		prestashop: 'prestashop',
		$: '$',
		jquery: 'jQuery'
	},
	devtool: HOT ? 'cheap-module-inline-source-map' : 'source-map',
	plugins: plugins,
	resolve: {
		extensions: ['.js', '.scss']
	}
};