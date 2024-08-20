/* eslint-disable no-unused-vars */
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const httpStatus = require("http-status");
const playerRoute = require("./routes/player.route");
const clubRoute = require("./routes/club.route");
const countryRoute = require("./routes/country.route");

const app = express();

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: httpStatus.OK,
    success: true,
    message: "I am functional !",
    data: null,
  });
});

app.use("/players", playerRoute);
app.use("/clubs", clubRoute);
app.use("/countries", countryRoute);

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

module.exports = app;
