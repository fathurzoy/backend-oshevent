const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DIALECT, DB_DATABASE } =
  process.env;

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "bb3dcnxjkozyszeglybw",
  host: "bb3dcnxjkozyszeglybw-mysql.services.clever-cloud.com",
  port: 3306,
  username: "u5rteyafnuufsip2",
  password: "HtpuG9Fs7ukQukvXLppK",
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
});

// const sequelize = new Sequelize({
//   dialect: "mysql",
//   database: "oshevent",
//   host: "localhost",
//   port: 3306,
//   username: "root",
//   password: "",
// });

module.exports = sequelize;

// const sequelize = new Sequelize({
//   dialect: "postgres",
//   database: "d8h1llivp5n1jk",
//   host: "ec2-34-205-46-149.compute-1.amazonaws.com",
//   port: 5432,
//   username: "jkudhwacvuiuhn",
//   password: "45a1ed1b6bb33d0747cf44b125b8fc9f98c49278243a07ab3ee2fe3f9267cafa",
//   dialectOptions:{
//     "ssl": { "rejectUnauthorized": false }
//   }
// });
