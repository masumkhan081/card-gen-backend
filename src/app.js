/* eslint-disable no-unused-vars */
const cors = require("cors");
const express = require("express");
const httpStatus = require("http-status");
const playerRoutes = require("./routes/player.route");
const clubRoutes = require("./routes/club.route");
const countryRoutes = require("./routes/country.route");
const cardRoutes = require("./routes/card.route");

const path = require("path");
//
const app = express();

const allowedOrigins = ["http://localhost:3000"];
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

//
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

// app.use(formidable());
//

app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: httpStatus.OK,
    success: true,
    message: "I am functional !",
    data: null,
  });
});

app.use("/players", playerRoutes);
app.use("/clubs", clubRoutes);
app.use("/countries", countryRoutes);
app.use("/cards",cardRoutes);

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
