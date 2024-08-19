const express = require("express");
const router = express.Router();
const cache = require("memory-cache");
const bookData = require("../static-data/books.json");
const playerData = require("../static-data/footballers.json");
const cron = require("node-cron");
const playerController = require("../controller/player.controller")


router.get("/", playerController.getPlayers);


router.get("/memory-cache", (req, res) => {
      console.log("got hit !");

      const cachedData = cache.get("cachedData");
      if (cachedData) {
            return res.json("From Cache: " + JSON.stringify(cachedData));
      }
      const newData = bookData;
      cache.put("cachedData", newData); // Cache for 10 minutes
      // console.log(newData[0].title);
      res.json("NEWDATA:  " + newData);
});


router.get("/schedule", (req, res) => {

      // cron.schedule('* * * * * *', () => {
      //       console.log('running every second');
      // });
      // 
      // cron.schedule('*/2 * * * * *', () => {
      //       console.log('running every 2 second');
      // });

      // cron.schedule('0 9 * * 1', () => {
      //       console.log('Task running every Monday at 9:00 AM');
      // });

      cron.schedule(' 0 9 * * *', () => {
            console.log('Task running every day at 9:00 AM');
      });

})

module.exports = router;
