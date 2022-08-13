const express = require("express");
const { comparePassword, hashPassword } = require("../service/hashPassword");
const { Users } = require("../model/Model");
const { Op } = require("sequelize");
const { inputToken, tokenCheck } = require("../service/jwt_service");
const user = express.Router();

//MEMBUAT ADMIN
user.post("/user_create", async (req, res) => {
  try {
    const data = await req.body;
    const result = await Users.create({
      ...data,
      password: hashPassword(data.password),
    });
    if (!result) {
      res.json({
        success: false,
        error: error.message,
      });
      return;
    } else {
      res.json({
        success: true,
        query: result,
      });
      return;
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//LOGIN ADMIN
user.post("/user_login", async (req, res) => {
  try {
    const data = await req.body;
    const findUsers = await Users.findOne({
      where: { username: data.username },
    });
    if (findUsers) {
      const compare = await comparePassword(data.password, findUsers.password);
      if (compare) {
        res.json({
          success: true,
          token: inputToken({
            ...findUsers.toJSON(),
            password: "********",
          }),
        });
      } else {
        res.json({
          success: false,
          msg: "Password yang anda masukan salah",
        });
      }
    } else {
      res.json({
        success: false,
        msg: "Data tidak ditemukan",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//MEMBACA SEMUA ADMIN
user.get("/user_read", tokenCheck, async (req, res) => {
  try {
    const result = await Users.findAll({
      order: [["id", "DESC"]],
    });
    res.json({
      success: true,
      query: result,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//UPDATE ADMIN
user.put("/user_update", tokenCheck, async (req, res) => {
  try {
    const data = await req.body;
    const record = await Users.findOne({
      where: { id: data.id },
    });
    if (!record) {
      res.json({
        success: false,
        msg: "Users tidak ditemukan",
      });
      return;
    }

    const updateUsers = await record.update({
      ...data,
      password: hashPassword(data.password),
    });
    res.json({
      success: true,
      query: updateUsers,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//DELETE ADMIN
user.delete("/user_delete/:id", tokenCheck, async (req, res) => {
  try {
    const { id } = await req.params;
    const findUsers = await Users.findOne({
      where: { id: id },
    });
    if (!findUsers) {
      res.json({
        success: false,
        msg: "Users tidak ditemukan",
      });
      return;
    }

    const deleteUsers = await findUsers.destroy();
    res.json({
      success: true,
      msg: "Berhasil delete Users",
      query: deleteUsers,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//FIND ADMIN
user.post("/user_find", tokenCheck, async (req, res) => {
  try {
    const { filter } = await req.body;
    const result = await Users.findOne({
      order: [["id", "DESC"]],
      where: filter,
    });
    res.json({
      success: true,
      query: result,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//FIND ADMIN
user.post("/user_find_many", tokenCheck, async (req, res) => {
  try {
    const { filter } = await req.body;
    const result = await Users.findAll({
      order: [["id", "DESC"]],
      where: filter,
    });
    res.json({
      success: true,
      query: result,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//FIND SERCH ADMIN
user.post("/user_search", tokenCheck, async (req, res) => {
  try {
    const { filter } = await req.body;
    const key = await Object.keys(filter);
    const value = await Object.values(filter);
    const result = await Users.findAll({
      order: [["id", "DESC"]],
      where: {
        [key]: {
          [Op.like]: `%${value}%`,
        },
      },
    });
    res.json({
      success: true,
      query: result,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = user;
