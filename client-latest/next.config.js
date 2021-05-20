const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    // register: true,
    // scope: '/app',
    // sw: 'service-worker.js',
    //...
  },
  env: {
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    API_URL: process.env.API_URL,
    API_URL_PRODUCTION: process.env.API_URL_PRODUCTION,
    API_URL_LOCAL: process.env.API_URL_LOCAL,
  },
  images: {
    domains: ["bikeparktignes.s3.eu-west-3.amazonaws.com"],
  },
  i18n,
});
