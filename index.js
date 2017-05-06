var includeAll = require('include-all');
var merge = require('lodash.merge');
module.exports = function(path, useEnv) {
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

	useEnv = useEnv || process.env.NODE_ENV;

	if(env && env.hasOwnProperty(useEnv)) {
		merge(config, env[useEnv]);
	}

	if(local) {
		merge(config, local);
	}
	return config;
};