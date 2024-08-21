/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const clubSchema = new Schema(
  {
    clubName: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Club = model("clubs", clubSchema);

module.exports = Club;
