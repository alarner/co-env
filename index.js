var includeAll = require('include-all');
var assign = require('lodash.assign');
module.exports = function(path) {
	var config = includeAll({
		dirname: path,
		filter:  /(.+)\.js$/
	});
	var local = config.local;
	var env = config.env;
	if(local) {
		delete config.local;
	}
	if(env) {
		delete config.env;
	}

	if(env && env.hasOwnProperty(process.env.NODE_ENV)) {
		assign(config, env[process.env.NODE_ENV]);
	}

	if(local) {
		assign(config, local);
	}
	return config;
};