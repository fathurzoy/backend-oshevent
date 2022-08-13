const { hashPassword } = require("../../service/hashPassword");
const { Admin } = require("../Model");

const admin_dummy = [
  {
    id: 1,
    username: "super_admin",
    password: hashPassword("super_admin"),
    role: "super_admin",
  },
  {
    id: 2,
    username: "cme",
    password: hashPassword("cme"),
    role: "cme",
  },
  {
    id: 3,
    username: "transport",
    password: hashPassword("transport"),
    role: "transport",
  },
  {
    id: 4,
    username: "ipn",
    password: hashPassword("ipn"),
    role: "ipn",
  },
  {
    id: 5,
    username: "admin",
    password: hashPassword("admin"),
    role: "admin",
  },
  {
    id: 6,
    username: "is",
    password: hashPassword("is"),
    role: "is",
  },
];

const admin_seeder = async () => {
  try {
    const result = await Admin.bulkCreate(admin_dummy);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = admin_seeder;
