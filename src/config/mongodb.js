const mongoose = require("mongoose");
require("dotenv").config();

const mongodbConnection = async () => {
  try {
    const DB_URL =
      process.env.DB_URL ||
      "mongodb+srv://masumkhan:pddrgj3q@cluster0.wyotw.mongodb.net/";
    await mongoose.connect(DB_URL, {
      dbName: "footballCards",
    });
    console.log("Mongodb connected!");
  } catch (error) {
    console.log("Mongodb not connected!");
  }
};

module.exports = mongodbConnection;
