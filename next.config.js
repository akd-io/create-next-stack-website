/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

// React GitHub Button
const withTM = require("next-transpile-modules")(["react-github-btn"]);
const resultWithTM = withTM(config);

// Sentry
const { withSentryConfig } = require("@sentry/nextjs");
const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};
const resultWithSentryConfig = withSentryConfig(
  withTM(config),
  SentryWebpackPluginOptions
);

module.exports = resultWithSentryConfig;
