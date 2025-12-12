const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = (envVars) => {
	const { env } = envVars;
	const envConfig = require(`./webpack.${env}.js`);
	const config = merge(commonConfig, envConfig, {
		plugins: [
			new Dotenv()
		]
	});
	
	return config;
};
