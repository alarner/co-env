module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: '127.0.0.1',
			user: 'alarner',
			password: '',
			database: 'intercrop',
			charset: 'utf8'
		},
		migrations: {
			tableName: 'migrations'
		},
		directory: './seeds/dev'
	}
};