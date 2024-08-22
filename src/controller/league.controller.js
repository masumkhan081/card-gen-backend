const leagueService = require("../services/league.service");
const httpStatus = require("http-status");
const { success_msg, err_msg } = require("../util/responseHandler");
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
  const result = await leagueService.createClub(req.body);
  res.send(result);
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
