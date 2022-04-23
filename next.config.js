const nextTranspileModules = require("next-transpile-modules");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

const configWithTM = nextTranspileModules(["react-github-btn"])(config);

module.exports = configWithTM;
