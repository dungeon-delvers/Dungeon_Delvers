import defaultConfig from 'eslint-config-myconfig';

export default {
  ...defaultConfig,
  env: {
    node: true, // Add this line
  },
};
