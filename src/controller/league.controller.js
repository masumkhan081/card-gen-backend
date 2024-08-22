const leagueService = require("../services/league.service");
const httpStatus = require("http-status");
const { success_msg, err_msg } = require("../util/responseHandler");
const { uploadLeagueImage } = require("../util/fileHandle");
const League = require("../model/league.model");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
//
async function getLeagues(req, res) {
  //
  const result = await leagueService.getLeagues(req.query);
  //
  res.send({
    statusCode: result ? 200 : 404,
    success: result ? true : false,
    message: result ? success_msg.fetch("Leagues") : err_msg.no_data,
    data: result,
  });
}

async function createLeague(req, res) {
  try {
    uploadLeagueImage(req, res, async (err) => {
      const leagueName = req.body.leagueName;

      if (err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }
      if (!req.file) {
        return res.status(400).json({ error: "Please send file" });
      }

      const fileUrl = `${req.protocol}://${req.get(
        "host"
      )}/public/league-images/${req.file.filename}`;
      //
      const existence = await League.findOne({ leagueName });

      if (existence) {
        await unlinkAsync(req.file.path);

        res.send({
          statusCode: httpStatus[409],
          success: false,
          message: "A league already exist ",
          data: null,
        });
      } else {
        const addResult = await League.create({
          leagueName,
          image: fileUrl,
        });
        res.send({
          statusCode: httpStatus[201],
          success: true,
          message: "League saved successfully",
          data: addResult,
        });
      }
    });
  } catch (err) {
    res.send(JSON.stringify(err));
  }
}
//
async function updateLeague(req, res) {
  const result = await leagueService.updateLeague({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteLeague(req, res) {
  const result = await leagueService.deleteLeague(req.params.id);
  res.send(result);
}

module.exports = {
  getLeagues,
  createLeague,
  updateLeague,
  deleteLeague,
};
