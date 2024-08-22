/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const countrySchema = new Schema(
  {
    countryName: {
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

const Country = model("countries", countrySchema);

module.exports = Country;
