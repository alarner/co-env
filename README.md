# Config Loader

Config Loader is a simple utility to load configuration data from a directory.

### Example:

To install with npm: `npm install --save alarner/config-loader`

```js
var configLoader = require('config-loader');
var path = require('path');
var config = configLoader(path.join(__dirname, './config'));

console.log(config);
```

Depending on what is inside of your config director you will get a different output. Imagine the following directory structure:

```
+-- config
|   +-- env
|   |   +-- development.js
|   |   +-- testing.js
|   |   +-- staging.js
|   |   +-- production.js
|   +-- webserver.js
|   +-- database.js
|   +-- auth.js
```

You would get a config file that would follow the directory structure:

```js
{
	webserver: { ... },
	database: { ... },
	auth: { ... }
}
```

Notice that the env directory and the local.js file are ignored. These are special constructs...

#### env directory

If there is an env directory directly inside of the path that is passed into the config loader the env directory will act as environment specific overrides to your config object. For example, if your `NODE_ENV` environment variable is set to `development` then the development.js file inside of your env director will override/add values in your resulting config object.

##### Example env/development.js

```js
module.exports = {
	webserver: baseUrl: 'http://localhost:3000'
};
```

The above development.js file would override the baseUrl property in your webserver.js file to be `'http://localhost:3000'` but only when you are running under your development environment.

> **Pro Tip:** You can also force a specific environment to be loaded from your code by pasing in the name of that environment as the second parameter of the configLoader function call. For example: `var config = configLoader(path.join(__dirname, './config'), 'test');` will force the `test` environment to be used.

#### local.js

The `local.js` file in the root of your config directory acts as an ultimate override for your config object. It will be applied after any defaults and environment specific configs are applied, and override any values that conflict. For example, if you wanted to override your database configurations settings for your specific machine (not every single machine running under a development environment) you could use a local.js file to apply these configuration changes. The `local.js` file should be added to the `.gitignore` file.

##### Example local.js

```js
module.exports = {
	database: {
		client: 'pg',
		connection: {
			host: '127.0.0.1',
			user: 'postgres',
			password: '',
			database: 'appdb',
			charset: 'utf8'
		},
		migrations: {
			tableName: 'migrations'
		},
		directory: './seeds/dev'
	}
};
```

The above `local.js` file would override the specified database property in your database.js file.