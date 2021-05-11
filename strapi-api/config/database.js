module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        host: env("DATABASE_HOST", "bikeparkv2.kjrz6.mongodb.net"),
        srv: env.bool("DATABASE_SRV", true),
        port: env.int("DATABASE_PORT", 27017),
        database: env("DATABASE_NAME", "BikeParkV2"),
        username: env("DATABASE_USERNAME", "BikePark"),
        password: env("DATABASE_PASSWORD"),
      },
      options: {
        authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
        ssl: env.bool("DATABASE_SSL", true),
      },
    },
  },
});
