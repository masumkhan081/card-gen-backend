const clubService = require("../services/club.service");
const httpStatus = require("http-status");
const { success_msg, err_msg } = require("../util/responseHandler");
//
async function getClubs(req, res) {
  //
  const result = await clubService.getClubs(req.query);
  //
  res.send({
    statusCode: result ? 200 : 404,
    success: result ? true : false,
    message: result ? success_msg.fetch("Clubs") : err_msg.no_data,
    data: result,
  });
}

async function createClub(req, res) {
  const result = await clubService.createClub(req.body);
  res.send(result);
}
//
async function updateClub(req, res) {
  const result = await clubService.updateClub({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteClub(req, res) {
  const result = await clubService.deleteClub(req.params.id);
  res.send(result);
}

module.exports = {
  getClubs,
  createClub,
  updateClub,
  deleteClub,
};
