const express = require("express");
const { Op } = require("sequelize");
const { Users, Participants } = require("../model/Model");
const participant = express.Router();

//CREATE PROKER
participant.post("/participant_create", async (req, res) => {
  try {
    const data = await req.body;
    const result = await Participants.create({
      ...data,
    });
    res.json({
      success: true,
      query: result,
    });
    res.json({
      success: false,
      error: error.message,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//READ ALL PROKER
participant.get("/participant_read", async (req, res) => {
  try {
    const result = await Participants.findAll({
      order: [["id", "ASC"]],
      include: [
        {
          model: Users,
        },
      ],
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

//UPDATE CATAGORY
participant.put("/participant_update", async (req, res) => {
  try {
    const data = await req.body;
    const record = await Participants.findOne({
      where: { id: data.id },
    });
    //FIND PROKER TERLEBIH DAHULU
    if (!record) {
      res.json({
        success: false,
        msg: "Participants tidak ditemukan",
      });
      return;
    }

    //UPDATE PROKER KETIKA SUDAH DI FIND
    const updateParticipants = await record.update({
      ...data,
    });
    res.json({
      success: true,
      query: updateParticipants,
    });
    res.json({
      success: false,
      error: error.message,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//DELETE PROKER
participant.delete("/participant_delete/:id", async (req, res) => {
  try {
    const { id } = await req.params;
    const findParticipants = await DIvisi.findOne({
      where: { id: id },
    });

    //FIND Participants SEBELUM DI DELETE
    if (!findParticipants) {
      res.json({
        success: false,
        msg: "Participants tidak ditemukan",
      });
      return;
    }

    //DELETE PROKER SETELAH DI FIND
    const Participants = await findParticipants.destroy();
    res.json({
      success: true,
      msg: "Berhasil delete Users",
      query: Participants,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//PROKER FIND
participant.post("/participant_find", async (req, res) => {
  try {
    const { filter } = await req.body;
    const result = await Participants.findOne({
      order: [["id", "DESC"]],
      where: filter,
      include: [
        {
          model: Users,
        },
      ],
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

//FIND SERACH PROKER
participant.post("/participant_search", async (req, res) => {
  try {
    const { filter } = await req.body;
    const key = await Object.keys(filter);
    const value = await Object.values(filter);
    const result = await Participants.findAll({
      order: [["id", "DESC"]],
      where: {
        [key]: {
          [Op.like]: `%${value}%`,
        },
      },
      include: [
        {
          model: Users,
        },
      ],
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

participant.post("/participant_find_many", async (req, res) => {
  try {
    const { filter } = await req.body;
    const result = await Participants.findAll({
      order: [["id", "DESC"]],
      where: filter,
      include: [
        {
          model: Users,
        },
      ],
    });
    if (!result) {
      res.json({
        success: false,
        msg: "participant tidak ditemukan",
      });
      return;
    }
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

module.exports = participant;
