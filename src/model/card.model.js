/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const cardSchema = new Schema(
  {
    cardName: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Card = model("cards", cardSchema);

module.exports = Card;
