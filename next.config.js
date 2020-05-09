const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css');
const withPlugins = require("next-compose-plugins");
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = withPlugins([
    [withSass, {
      cssModules: false,
      cssLoaderOptions: {
        localIdentName: '[path]___[local]___[hash:base64:5]',
      },
    }, [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD]],
    withCss,
  ], {
  webpack: (config) => {
    return config
  },
});