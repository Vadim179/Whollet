module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./app'],
          extensions: ['.js', '.ts', '.tsx', '.json'],
          alias: {
            '@tests': 'app/tests',
            '@theme': 'app/theme',
            '@types': 'app/types',
            '@context': 'app/context',
            '@utils': 'app/utils',
            '@styles': 'app/styles',
            '@navigation': 'app/navigation',
            '@components': 'app/components',
            '@icons': 'app/components/assets/icons',
            '@screens': 'app/screens',
          },
        },
      ],
    ],
  };
};
