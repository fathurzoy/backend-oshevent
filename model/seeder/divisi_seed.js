const { Divisi } = require("../Model");

const divisi_dummy = [
  {
    id: 1,
    name: "CME",
  },
  {
    id: 2,
    name: "TRANSPORT",
  },
  {
    id: 3,
    name: "IPN",
  },
  {
    id: 4,
    name: "ADMIN",
  },
  {
    id: 5,
    name: "IS",
  },
];

const divisi_seeder = async () => {
  try {
    const result = await Divisi.bulkCreate(divisi_dummy);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = divisi_seeder;
