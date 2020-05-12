const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass')
const withTM = require('next-transpile-modules')(['antd']);
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = withPlugins(
  [
    withCss,
    withTM,
    [
      withSass, {
        cssModules: true,
        cssLoaderOptions: {
          localIdentName: '[path]___[local]___[hash:base64:5]',
        },
      },
      [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD]
    ],
    [
      withBundleAnalyzer,
      {
        enabled: process.env.ANALYZE === 'true',
      }
    ],
  ],
  {
    webpack: (config) => {
      return config
    },
  }
);