# Dungeon Delvers Config

This package contains shared configurations for the Dungeon Delvers project. It includes TypeScript and Jest
configurations to ensure consistency and ease of setup across different parts of the project.

## TypeScript Configuration

The TypeScript configuration (`tsconfig.json`) provides a common set of compiler options and paths for the project. To
use it, extend this configuration in your project's `tsconfig.json`:

```json
{
  "extends": "./path/to/config/tsconfig.json",
  "compilerOptions": {
    // Your custom options here
  }
}
```

## Jest Configuration

The Jest configuration (`jest.config.js`) includes shared settings for running tests. To use it, extend this
configuration in your project's Jest configuration file:

```javascript
const baseConfig = require('./path/to/config/jest.config.js');

module.exports = {
  ...baseConfig,
  // Your custom options here
};
```

## Usage

1. Install the config package in your project:

   ```sh
   npm install --save-dev path/to/config
   ```

2. Extend the configurations as shown above in your project's configuration files.

By using these shared configurations, you can maintain consistency and reduce duplication across your project.

## License

This project is licensed under the ISC License.
