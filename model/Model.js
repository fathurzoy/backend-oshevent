const { DataTypes } = require("sequelize");
const sequelize = require("../model/connection");

//TABLE ADMIN
const Users = sequelize.define("users", {
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(["admin", "user"]),
    defaultValue: "user",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Events = sequelize.define("events", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  class: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventtype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  organization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  regis_status: {
    type: DataTypes.ENUM(["hidden", "open", "close", "finish"]),
    allowNull: false,
  },
  tournament_status: {
    type: DataTypes.ENUM(["open", "close"]),
    allowNull: false,
  },
  festival_status: {
    type: DataTypes.ENUM(["no", "yes"]),
    allowNull: false,
  },
});

const EventParticipants = sequelize.define("event_participants", {
  class: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link_video: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Participants = sequelize.define("participants", {
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM(["laki-laki", "perempuan"]),
    allowNull: false,
  },
  idcard: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.hasMany(Events, {
  foreignKey: "user_id",
  sourceKey: "id",
  constraints: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Users.hasMany(Participants, {
  foreignKey: "user_id",
  sourceKey: "id",
  constraints: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Participants.hasMany(EventParticipants, {
  foreignKey: "participant_id",
  sourceKey: "id",
  constraints: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Events.hasMany(EventParticipants, {
  foreignKey: "event_id",
  sourceKey: "id",
  constraints: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Events.belongsTo(Users, {
  foreignKey: "user_id",
});

Participants.belongsTo(Users, {
  foreignKey: "user_id",
});

EventParticipants.belongsTo(Participants, {
  foreignKey: "participant_id",
});

EventParticipants.belongsTo(Events, {
  foreignKey: "event_id",
});

module.exports = {
  Users,
  Events,
  EventParticipants,
  Participants,
};
