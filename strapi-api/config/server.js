require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  url = "https://bikeparktignes.com/strapi";
}

if (process.env.NODE_ENV !== "production") {
  url = "http://localhost:1337/strapi";
}

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url,

  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "85a0d60d334e9ea4a521ce9f34f9a8f1"),
    },
  },
});
