const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePassword = async (password, hash) => {
  const check = await bcrypt.compareSync(password, hash);
  return check;
};

module.exports = { hashPassword, comparePassword };
