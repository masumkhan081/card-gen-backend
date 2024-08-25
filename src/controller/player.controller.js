const playerService = require("../services/player.service");
const { success_msg, err_msg } = require("../util/responseHandler");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { uploadPlayerImage } = require("../util/fileHandle");
const Player = require("../model/player.model");
const httpStatus = require("http-status");
const unlinkAsync = promisify(fs.unlink);

//
async function getPlayers(req, res) {
  //
  const result = await playerService.getPlayers(req.query);
  //
  res.send({
    statusCode: result.data.length > 0 ? 200 : 404,
    success: result.data.length > 0 ? true : false,
    message:
      result.data.length > 0 ? success_msg.fetch("Players") : err_msg.no_data,
    data: result,
  });
}

async function createPlayer(req, res) {
  try {
    uploadPlayerImage(req, res, async (err) => {
      //
      const {
        playerName,

        overall,
        rarity,
        nationality,
        league,
        foot,
        skillMoves,
        weakFoot,
        atkWorkrate,
        defWorkrate,
        position,
        playStyle,
        altPosition,
        pace,
        dribbling,
        pass,
        shot,
        defense,
        physical,
      } = req.body;

      const arrPlayStyle = playStyle ? JSON.parse(playStyle) : [];
      const arrAltPosition = altPosition ? JSON.parse(altPosition) : [];

      if (err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }
      if (!req.file) {
        return res.status(400).json({ error: "Please send player Image file" });
      }
      const fileUrl = `${req.protocol}://${req.get(
        "host"
      )}/public/player-images/${req.file.filename}`;
      //
      // const existence = await Card.findOne({ playerName });

      // if (existence) {
      //   await unlinkAsync(req.file.path);

      //   res.send({
      //     statusCode: httpStatus[409],
      //     success: false,
      //     message: "A card already exist with this name",
      //     data: null,
      //   });
      // } else {

      try {
        const addResult = await Player.create({
          playerName,
          image: fileUrl,
          overall,
          rarity,
          nationality,
          league,
          foot,
          skillMoves,
          weakFoot,
          atkWorkrate,
          defWorkrate,
          position,
          playStyle: arrPlayStyle,
          altPosition: arrAltPosition,
          pace,
          dribbling,
          pass,
          shot,
          defense,
          physical,
        });

        res.send({
          statusCode: httpStatus[201],
          success: true,
          message: "Player details saved successfully",
          data: addResult,
        });
      } catch (err) {
        console.log(err);
        res.send({
          statusCode: httpStatus[400],
          success: false,
          message: "required fields are missing",
          data: null,
        });
      }
    });
  } catch (err) {
    res.send(JSON.stringify(err));
  }

  // const result = await playerService.createPlayer(req.body);
  // res.send(result);
}
//
async function updatePlayer(req, res) {
  const result = await playerService.updatePlayer({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deletePlayer(req, res) {
  const result = await playerService.deletePlayer(req.params.id);
  res.send(result);
}

module.exports = {
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
