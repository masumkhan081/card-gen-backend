/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
//

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clubs",
      required: true,
    },
    nationality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "countries",
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    overall: {
      type: Number,
    },
    dribbling: {
      type: Number,
    },
    pass: {
      type: Number,
      required: false,
    },
    shot: {
      type: Number,
      required: false,
    },
    tackling: {
      type: Number,
      required: false,
    },
    speed: {
      type: Number,
      required: false,
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
