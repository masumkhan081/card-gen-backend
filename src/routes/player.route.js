const express = require("express");
const router = express.Router();
const playerData = require("../data/players.json");
const playerController = require("../controller/player.controller");
const playerSchema = require("../validate/player.validate");
const validateRequest = require("../middlewares/validateRequest");
const { uploadPlayerImage, uploadCardImage } = require("../util/fileHandle");
const Club = require("../model/club.model");

router.get("/", playerController.getPlayers);
//  validateRequest(playerSchema)
router.post("/", playerController.createPlayer);
router.patch("/:id", playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);
//
//
router.post("/new-player", async (req, res) => {
  try {
    let fileUrl, playerName;

    uploadPlayerImage(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }
      if (!req.file) {
        return res.status(400).json({ error: "Please send file" });
      }

      fileUrl = `${req.protocol}://${req.get("host")}/public/${
        req.file.filename
      }`;

      const addResult = await Club.create({
        clubName: req.body.playerName,
        photo: fileUrl,
      });
      console.log(JSON.stringify(addResult));
      res.send(addResult);

      // res.send(
      //   `File uploaded successfully! <a href="${fileUrl}">View file</a>  ${playerName}`
      // );
    });
  } catch (err) {
    res.send(JSON.stringify(err));
  }
});

router.post("/new-card", (req, res) => {
  uploadCardImage(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Please send file" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/public/card-images/${
      req.file.filename
    }`;
    res.send(
      `File uploaded successfully! <a href="${fileUrl}">View file</a>  ${req.body.playerName}`
    );
  });
});

module.exports = router;
