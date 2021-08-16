/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

const withTM = require("next-transpile-modules")(["react-github-btn"]);

module.exports = withTM(config);
