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
    overall: {
      type: Number,
    },
    rarity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cards",
    },
    nationality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "countries",
    },
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "leagues",
    },
    foot: {
      type: String,
      enum: ["L", "R"],
    },
    skillMoves: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    weakFoot: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    atkWorkrate: {
      type: String,
      enum: ["H", "M", "L"],
    },
    defWorkrate: {
      type: String,
      enum: ["H", "M", "L"],
    },
    position: {
      type: String,
    },
    playStyle: {
      type: [String],
    },
    altPosition: {
      type: [String],
    },
    pace: {
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
    defense: {
      type: Number,
    },
    physical: {
      type: Number,
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clubs",
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
