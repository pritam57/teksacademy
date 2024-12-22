const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // Reduce the number of workers to lower the load on file watching
  transformer: {
    minifierConfig: {
      // Optional: Add minifier settings if necessary
    },
  },
  maxWorkers: 1, // Lower the number of workers to avoid too many file watchers
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
