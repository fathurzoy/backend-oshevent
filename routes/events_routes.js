const express = require("express");
const { Op } = require("sequelize");
const { Events, EventParticipants, Participants } = require("../model/Model");
const event = express.Router();

const checkOffsets = (page, limit) => {
  let pg = page - 1;
  return pg * limit;
};

//CREATE PROKER
event.post("/event_create", async (req, res) => {
  try {
    const data = await req.body;
    const result = await Events.create({
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
event.get("/event_read", async (req, res) => {
  try {
    const result = await Events.findAll({
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: EventParticipants,
          include: [
            {
              model: Participants,
            },
          ],
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
event.post("/event_read", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = await req.body;

    const result = await Events.findAndCountAll({
      order: [["updatedAt", "DESC"]],
      limit: limit,
      offset: checkOffsets(page, limit),
      include: [
        {
          model: EventParticipants,
          include: [
            {
              model: Participants,
            },
          ],
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
event.put("/event_update", async (req, res) => {
  try {
    const data = await req.body;
    const record = await Events.findOne({
      where: { id: data.id },
    });
    //FIND PROKER TERLEBIH DAHULU
    if (!record) {
      res.json({
        success: false,
        msg: "Events tidak ditemukan",
      });
      return;
    }

    //UPDATE PROKER KETIKA SUDAH DI FIND
    const updateEvents = await record.update({
      ...data,
    });
    res.json({
      success: true,
      query: updateEvents,
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
event.delete("/event_delete/:id", async (req, res) => {
  try {
    const { id } = await req.params;
    const findEvents = await Events.findOne({
      where: { id: id },
    });

    //FIND PROKER SEBELUM DI DELETE
    if (!findEvents) {
      res.json({
        success: false,
        msg: "Events tidak ditemukan",
      });
      return;
    }

    //DELETE PROKER SETELAH DI FIND
    const deleteEvents = await findEvents.destroy();
    res.json({
      success: true,
      msg: "Berhasil delete Events",
      query: deleteEvents,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//PROKER FIND
event.post("/event_find", async (req, res) => {
  try {
    const { filter } = await req.body;
    const result = await Events.findOne({
      order: [["updatedAt", "DESC"]],
      where: filter,
      include: [
        {
          model: EventParticipants,
          include: [
            {
              model: Participants,
            },
          ],
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

event.post("/event_find_many", async (req, res) => {
  try {
    const { filter } = await req.body;
    let { page = 1, limit = 10 } = await req.body;

    const result = await Events.findAndCountAll({
      order: [["updatedAt", "DESC"]],
      where: filter,
      limit: limit,
      offset: checkOffsets(page, limit),
      include: [
        {
          model: EventParticipants,
          include: [
            {
              model: Participants,
            },
          ],
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

event.post("/event_find_many_divisi", async (req, res) => {
  try {
    const { filter } = await req.body;
    let { page = 1, limit = 10 } = await req.body;

    const result = await Events.findAndCountAll({
      order: [["updatedAt", "DESC"]],
      where: filter,
      limit: limit,
      offset: checkOffsets(page, limit),
      include: [
        {
          model: EventParticipants,
          include: [
            {
              model: Participants,
            },
          ],
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

//FIND SERACH PROKER
event.post("/event_search", async (req, res) => {
  try {
    const { filter } = await req.body;
    let { page = 1, limit = 10 } = await req.body;

    const key = await Object.keys(filter);
    const value = await Object.values(filter);
    const result = await Events.findAndCountAll({
      order: [["updatedAt", "DESC"]],
      limit: limit,
      offset: checkOffsets(page, limit),
      where: {
        [key]: {
          [Op.like]: `%${value}%`,
        },
      },
      include: [
        {
          model: EventParticipants,
          include: [
            {
              model: Participants,
            },
          ],
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

module.exports = event;
