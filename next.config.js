const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass')
const withTM = require('next-transpile-modules');
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require('@next/bundle-analyzer')
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = withPlugins(
  [
    withCss,
    [
      withSass, {
        cssModules: true,
        cssLoaderOptions: {
          localIdentName: '[path]___[local]___[hash:base64:5]',
        },
      },
      [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD]
    ],
    withTM(['antd']), // 解决node_modules中代码不被 loader 解析的问题
    withBundleAnalyzer({ // bundle分析工具，使用：npm run build:analyze
      enabled: process.env.ANALYZE === 'true',
    }),
  ],
  {
    webpack: (config) => {
      return config
    },
  }
);