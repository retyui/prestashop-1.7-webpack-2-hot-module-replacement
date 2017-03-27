/**
 * Require Browsersync along with webpack and middleware for it
 */
let browserSync          = require('browser-sync').create();
let webpack              = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let webpackConfig        = require('./webpack.config.js');
/**
 * Require ./webpack.config.js and make a bundler from it
 */
const bsPort = 3000;
webpackConfig.watch = false;
webpackConfig.output.publicPath = `http://localhost:${bsPort}/ps/themes/classic/assets/js/` // url to webpack output path

let bundler = webpack(webpackConfig);

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync.init({
	open: true
	, port: bsPort
	, proxy: {
		target: `http://localhost:88` //host your local webserver
	}
	, src: [`./templates/**/*.tpl`, `./modules/**/*.tpl`] // full page reload if .tpl file changed
	, middleware: [
		webpackDevMiddleware( bundler, {
			// IMPORTANT: dev middleware can't access config, so we should
			// provide publicPath by ourselves
			publicPath: webpackConfig.output.publicPath
			, stats: { colors: true , chunck : false}
			, hot: true
		} ),
		webpackHotMiddleware( bundler )
	]
});