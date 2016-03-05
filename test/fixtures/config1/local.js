module.exports = {
	database: {
		development: {
			client: 'postgresql',
			directory: './seeds/development'
		}
	},
	session: {
		store: 'http://google.com'
	}
}