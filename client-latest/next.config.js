module.exports = {
  env: {
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
  },
  images: {
    domains: ["bikeparktignes.s3.eu-west-3.amazonaws.com"],
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "fr",
  },
};
