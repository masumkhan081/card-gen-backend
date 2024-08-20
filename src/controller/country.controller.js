const countryService = require("../services/country.service");
const httpStatus = require("http-status");
const { success_msg, err_msg } = require("../util/responseHandler");

//
async function getCountries(req, res) {
  //
  const result = await countryService.getCountries(req.query);
  //
  res.send({
    statusCode: result ? 200 : 404,
    success: result ? true : false,
    message: result ? success_msg.fetch("Countries") : err_msg.no_data,
    data: result,
  });
}

async function createCountry(req, res) {
  const result = await countryService.createCountry(req.body);
  res.send(result);
}
//
async function updateCountry(req, res) {
  const result = await countryService.updateCountry({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteCountry(req, res) {
  const result = await countryService.deleteCountry(req.params.id);
  res.send(result);
}

module.exports = {
  getCountries,
  createCountry,
  updateCountry,
  deleteCountry,
};
