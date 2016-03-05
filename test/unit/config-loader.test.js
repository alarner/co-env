'use strict';

process.env.NODE_ENV = 'development';

var path = require('path');
var configLoader = require('../../index');
describe('config-loader', function() {
	it('should exist', function() {
		expect(configLoader).not.to.be.undefined;
	});
	it('should load in all files in the directory', function() {
		var config = configLoader(path.join(__dirname, '../fixtures/config1'));
		expect(config).not.to.be.undefined;
		expect(config.webserver).not.to.be.undefined;
		expect(config.database).not.to.be.undefined;
		expect(config.database.development).not.to.be.undefined;
	});
	it('should respect environment overrides', function() {
		var config = configLoader(path.join(__dirname, '../fixtures/config1'));
		expect(config.webserver.baseUrl).to.equal('http://localhost:3001');
	});
	it('should respect local.js overrides', function() {
		var config = configLoader(path.join(__dirname, '../fixtures/config1'));
		expect(config.database.development.client).to.equal('postgresql');
		expect(config.database.development.directory).to.equal('./seeds/development');
	});
	it('should merge overrides, not completely overwrite them', function() {
		var config = configLoader(path.join(__dirname, '../fixtures/config1'));
		expect(config.database.development.connection.host).not.to.be.undefined;
	});
	it('should overwrite strings if they were an object before', function() {
		var config = configLoader(path.join(__dirname, '../fixtures/config1'));
		expect(config.session.store).to.equal('http://google.com');
		expect(config.session.foo).to.equal('string');
	});
})