const playerService = require("../services/player.service");
const { success_msg, err_msg } = require("../util/responseHandler");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

//
async function getPlayers(req, res) {
  //
  const result = await playerService.getPlayers(req.query);
  //
  res.send({
    statusCode: result ? 200 : 404,
    success: result ? true : false,
    message: result ? success_msg.fetch("Players") : err_msg.no_data,
    data: result,
  });
}

async function createPlayer(req, res) {
  const result = await playerService.createPlayer(req.body);
  res.send(result);
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
