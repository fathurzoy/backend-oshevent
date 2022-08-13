const express = require("express");
const { Op } = require("sequelize");
const { EventParticipants, Participants } = require("../model/Model");
const event_participant = express.Router();

const checkOffsets = (page, limit) => {
  let pg = page - 1;
  return pg * limit;
};

//CREATE PROKER
event_participant.post("/event_participant_create", async (req, res) => {
  try {
    const data = await req.body;
    const result = await EventParticipants.create({
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
event_participant.get("/event_participant_read", async (req, res) => {
  try {
    const result = await EventParticipants.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: Participants,
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

//READ ALL PROKER
event_participant.post("/event_participant_read", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = await req.body;

    const result = await EventParticipants.findAndCountAll({
      order: [["id", "DESC"]],
      limit: limit,
      offset: checkOffsets(page, limit),
      include: [
        {
          model: Participants,
        },
      ],
    });
    res.json({
      success: true,
      total_page: Math.ceil(result.count / limit),
      current_page: page,
      per_page: limit,
      total_data: result.count,
      query: result.rows,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//UPDATE CATAGORY
event_participant.put("/event_participant_update", async (req, res) => {
  try {
    const data = await req.body;
    const record = await EventParticipants.findOne({
      where: { id: data.id },
    });
    //FIND PROKER TERLEBIH DAHULU
    if (!record) {
      res.json({
        success: false,
        msg: "EventParticipants tidak ditemukan",
      });
      return;
    }

    //UPDATE PROKER KETIKA SUDAH DI FIND
    const updateEventParticipants = await record.update({
      ...data,
    });
    res.json({
      success: true,
      query: updateEventParticipants,
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
event_participant.delete("/event_participant_delete/:id", async (req, res) => {
  try {
    const { id } = await req.params;
    const findEventParticipants = await EventParticipants.findOne({
      where: { id: id },
    });

    //FIND PROKER SEBELUM DI DELETE
    if (!findEventParticipants) {
      res.json({
        success: false,
        msg: "EventParticipants tidak ditemukan",
      });
      return;
    }

    //DELETE PROKER SETELAH DI FIND
    const deleteEventParticipants = await findEventParticipants.destroy();
    res.json({
      success: true,
      msg: "Berhasil delete EventParticipants",
      query: deleteEventParticipants,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//PROKER FIND
event_participant.post("/event_participant_find", async (req, res) => {
  try {
    const { filter } = await req.body;
    const result = await EventParticipants.findOne({
      order: [["id", "DESC"]],
      where: filter,
      include: [
        {
          model: Participants,
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
event_participant.post("/event_participant_search", async (req, res) => {
  try {
    const { filter } = await req.body;
    let { page = 1, limit = 10 } = await req.body;

    const key = await Object.keys(filter);
    const value = await Object.values(filter);
    const result = await EventParticipants.findAndCountAll({
      order: [["id", "DESC"]],
      limit: limit,
      offset: checkOffsets(page, limit),
      where: {
        [key]: {
          [Op.like]: `%${value}%`,
        },
      },
      include: [
        {
          model: Participants,
        },
      ],
    });
    res.json({
      success: true,
      total_page: Math.ceil(result.count / limit),
      current_page: page,
      per_page: limit,
      total_data: result.count,
      query: result.rows,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

event_participant.post("/event_participant_find_many", async (req, res) => {
  try {
    const { filter } = await req.body;
    let { page = 1, limit = 10 } = await req.body;

    const result = await EventParticipants.findAndCountAll({
      order: [
        ["posisi", "ASC"],
        ["divisi_id", "ASC"],
        ["id", "DESC"],
      ],
      where: filter,
      limit: limit,
      offset: checkOffsets(page, limit),
      include: [
        {
          model: Participants,
        },
      ],
    });
    res.json({
      success: true,
      total_page: Math.ceil(result.count / limit),
      current_page: page,
      per_page: limit,
      total_data: result.count,
      query: result.rows,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = event_participant;
