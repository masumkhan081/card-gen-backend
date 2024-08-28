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

async function getPlayer(req, res) {
  //
  const result = await playerService.getPlayer(req.params.id);
  //
  res.send({
    statusCode: result ? 200 : 404,
    success: result ? true : false,
    message: result ? success_msg.fetch("Player") : err_msg.no_data,
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

      try {
        const addResult = await Player.create({
          playerName,
          image: fileUrl,
          overall: overall ? overall : 0,
          rarity,
          nationality,
          league,
          foot: foot ? foot : "",
          skillMoves: skillMoves ? skillMoves : 0,
          weakFoot: weakFoot ? weakFoot : 0,
          atkWorkrate: atkWorkrate ? atkWorkrate : "",
          defWorkrate: foot ? foot : "",
          position: position ? position : "",
          playStyle: arrPlayStyle,
          altPosition: arrAltPosition,
          pace: pace ? pace : 0,
          dribbling: dribbling ? dribbling : 0,
          pass: pass ? pass : 0,
          shot: shot ? shot : 0,
          defense: defense ? defense :0,
          physical: physical ? physical : 0,
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
}
//
async function updatePlayer(req, res) {
  try {
    const updatePlayerId = req.params.id;
    const updatablePlayer = await Player.findById(updatePlayerId);
    let fileUrl;
    console.log("updatablePlayer:  " + JSON.stringify(updatablePlayer));

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
      if (req.file) {
        fileUrl = `${req.protocol}://${req.get("host")}/public/player-images/${
          req.file.filename
        }`;
      }

      try {
        const updateResult = await Player.findByIdAndUpdate(
          updatePlayerId,
          {
            playerName,
            image: fileUrl ? fileUrl : updatablePlayer.image,
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
          },
          {
            new: true,
          }
        );

        res.send({
          statusCode: httpStatus[200],
          success: true,
          message: "Player details updated successfully",
          data: updateResult,
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
}
//
async function deletePlayer(req, res) {
  const result = await playerService.deletePlayer(req.params.id);
  res.send(result);
}

module.exports = {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
