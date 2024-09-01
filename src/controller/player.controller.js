const playerService = require("../services/player.service");
const {
  success_msg,
  err_msg,
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../util/responseHandler");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { uploadPlayerImage } = require("../util/fileHandle");
const Player = require("../model/player.model");
const httpStatus = require("http-status");
const { operableEntities } = require("../config/constants");
const unlinkAsync = promisify(fs.unlink);
//
async function getPlayers(req, res) {
  //
  const result = await playerService.getPlayers(req.query);
  //
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.players });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.players });
  }
}

async function getPlayer(req, res) {
  //
  const result = await playerService.getPlayer(req.params.id);
  //
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.players });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.players });
  }
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
        return res.json({ statusCode: 500, error: err });
      }
      if (!req.file) {
        return res.status(400).json({ error: "Please send player Image file" });
      }
      //
      const fileUrl = `${req.protocol}://${req.get(
        "host"
      )}/public/player-images/${req.file.filename}`;
      //
      try {
        const newPlayer = new Player({
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
          defense: defense ? defense : 0,
          physical: physical ? physical : 0,
        });

        const addResult = await newPlayer.save();

        if (addResult instanceof Error) {
          sendErrorResponse({
            res,
            error: result,
            what: operableEntities.card,
          });
        } else {
          sendCreateResponse({
            res,
            what: operableEntities.player,
            data: addResult,
          });
        }
      } catch (error) {
        await unlinkAsync(req.file.path);
        sendErrorResponse({ res, error, what: operableEntities.player });
      }
    });
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.player });
  }
}
//
async function updatePlayer(req, res) {
  try {
    const updatePlayerId = req.params.id;
    let fileUrl;
    //

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

        sendCreateResponse({
          res,
          what: operableEntities.player,
          data: updateResult,
        });
        //
      } catch (error) {
        await unlinkAsync(req.file.path);
        sendErrorResponse({ res, error, what: operableEntities.player });
      }
    });
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.player });
  }
}
//
async function deletePlayer(req, res) {
  const result = await playerService.deletePlayer(req.params.id);
  if (result instanceof Error) {
    console.log("instance of err");
    sendErrorResponse({ res, error: result, what: operableEntities.player });
  } else {
    sendDeletionResponse({ res, data: result, what: operableEntities.player });
  }
}

module.exports = {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
