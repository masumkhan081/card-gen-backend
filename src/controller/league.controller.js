const leagueService = require("../services/league.service");
const httpStatus = require("http-status");
const { success_msg, err_msg } = require("../util/responseHandler");
const { uploadLeagueImage } = require("../util/fileHandle");
const League = require("../model/league.model");
//
async function getLeagues(req, res) {
  //
  const result = await leagueService.getClubs(req.query);
  //
  res.send({
    statusCode: result ? 200 : 404,
    success: result ? true : false,
    message: result ? success_msg.fetch("Clubs") : err_msg.no_data,
    data: result,
  });
}

async function createLeague(req, res) {
  try {
    const leagueName = req.body.leagueName;
    const existence = await Club.findOne({ leagueName });

    if (existence) {
      res.send({
        statusCode: httpStatus[409],
        success: false,
        message: "The league already enlisted",
        data: null,
      });
    } else {
      uploadLeagueImage(req, res, async (err) => {
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

        const addResult = await League.create({
          leagueName,
          image: fileUrl,
        });
        res.send({
          statusCode: httpStatus[201],
          success: true,
          message: "New League enlisted",
          data: addResult,
        });
        // res.send(
        //   `File uploaded successfully! <a href="${fileUrl}">View file</a>  ${playerName}`
        // );
      });
    }
  } catch (err) {
    res.send(JSON.stringify(err));
  }
}
//
async function updateLeague(req, res) {
  const result = await leagueService.updateClub({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteLeague(req, res) {
  const result = await leagueService.deleteClub(req.params.id);
  res.send(result);
}

module.exports = {
  getLeagues,
  createLeague,
  updateLeague,
  deleteLeague,
};
