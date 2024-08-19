const express = require('express');
const app = express();
// const fetch = require('node-fetch');
const axios = require('axios');
const PORT = 3000;
app.use(express.json());
const cors = require('cors');
const scrape = require("./util/scrape");
const puppeteer = require("puppeteer");
const bookRouter = require("./routes/book")
const playerRoute = require("./routes/player.route");
//
const corsOptions = {
      origin: 'http://localhost:5173',
      methods: 'GET,POST',
      allowedHeaders: 'Content-Type',
};
app.use(cors(corsOptions));

//  test route
app.use("", bookRouter);
app.use("/players", playerRoute);

// Start the server
app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
});

