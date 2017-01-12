const express = require('express');
const path = require('path');

const app = express();

// server routes...
app.get('/hello', (req, res) => res.send({ hi: 'hello'}));

/* process.env goes after any Database or Server Routes/Handlers code */
if (process.env.NODE_ENV !== 'production') { // Is application in development environment? If so, use the middleware
	const webpackMiddleware = require('webpack-dev-middleware'); // Middleware
	const webpack = require('webpack'); // Webpack Library
	const webpackConfig = require('./webpack.config.js'); // My Webpack Configuration

	app.use(webpackMiddleware(webpack(webpackConfig)));
} else { // Yes, running in production environment
	app.use(express.static('dist')); // use everything in the ./dist directory - public
	// requests by users will be generally given access to anything in this directory
	app.get('*', (req,res) => { // If anyone makes a GET request to any route on server...
		res.sendFile(path.join(__dirname, 'dist/index.html')); // ...return index.html
		// Makes sure the React-Router {browserHistory} library works correctly
	});
}

// FYI: Heroku or other production providers may specify their own production port variable
// so add: process.env.PORT || 3050process.env.PORT || 
app.listen(process.env.PORT || 3050, () => console.log('Listening')); // Listen on localhost:3050

