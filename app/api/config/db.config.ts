module.exports = {
  HOST: "eattheworld.se.mysql",
  USER: "eattheworld_secountrydb",
  PASSWORD: "admin123",
  DB: "eattheworld_secountrydb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
