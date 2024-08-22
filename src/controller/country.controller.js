const countryService = require("../services/country.service");
const httpStatus = require("http-status");
const { success_msg, err_msg } = require("../util/responseHandler");
const Country = require("../model/country.model");
const { uploadCountryImage } = require("../util/fileHandle");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
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
  try {
    console.log("country upload to be ok !");

    uploadCountryImage(req, res, async (err) => {
      const countryName = req.body.countryName;

      console.log("countryName: " + countryName);

      if (err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }
      if (!req.file) {
        return res.status(400).json({ error: "Please send file" });
      }
      const fileUrl = `${req.protocol}://${req.get(
        "host"
      )}/public/country-images/${req.file.filename}`;
      //
      const existence = await Country.findOne({ countryName });

      console.log("existence: " + JSON.stringify(existence));

      if (existence) {
        await unlinkAsync(req.file.path);

        res.send({
          statusCode: httpStatus[409],
          success: false,
          message: "A country already exist with this name",
          data: null,
        });
      } else {
        const addResult = await Country.create({
          countryName,
          image: fileUrl,
        });
        res.send({
          statusCode: httpStatus[201],
          success: true,
          message: "Country saved successfully",
          data: addResult,
        });
      }
    });
  } catch (err) {
    res.send(JSON.stringify(err));
  }
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
