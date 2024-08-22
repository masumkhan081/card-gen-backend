/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
//

const playerSchema = new Schema(
  {
    playerName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clubs",
    },
    nationality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "countries",
    },
    position: {
      type: String,
    },
    overall: {
      type: Number,
    },
    dribbling: {
      type: Number,
    },
    pass: {
      type: Number,
    },
    shot: {
      type: Number,
    },
    tackling: {
      type: Number,
    },
    speed: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Player = model("players", playerSchema);

module.exports = Player;
