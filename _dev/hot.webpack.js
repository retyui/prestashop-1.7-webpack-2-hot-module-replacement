/**
 * Require Browsersync along with webpack and middleware for it
 */
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
/**
 * Require ./webpack.config.js and make a bundler from it
 */
const browserSyncPort = 3000;
const themeFolderName = 'hmr-webpack2';
webpackConfig.watch = false;
webpackConfig.output.publicPath = `http://localhost:${browserSyncPort}/themes/${themeFolderName}/assets/js/` // url to webpack output path

const bundler = webpack(webpackConfig);

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync.init({
	logLevel: "debug",
	open: true,
	port: browserSyncPort,
	proxy: {
		target: 'http://localhost:8080' // host your local webserver 
	},
	files: [ // full page reload if .tpl file changed
		'../templates/**/*.tpl',
		'../modules/**/*.tpl'
	],
	middleware: [
		webpackDevMiddleware(bundler, {
			// IMPORTANT: dev middleware can't access config, so we should
			// provide publicPath by ourselves
			publicPath: webpackConfig.output.publicPath,
			stats: {
				colors: true,
				chunck: false
			},
			hot: true
		}),
		webpackHotMiddleware(bundler)
	]
});
