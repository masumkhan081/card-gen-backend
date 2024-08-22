const countryService = require("../services/country.service");
const httpStatus = require("http-status");
const { success_msg, err_msg } = require("../util/responseHandler");
const Country = require("../model/country.model");
const { uploadCountryImage } = require("../util/fileHandle");
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
    const countryName = req.body.countryName;
    const existence = await Club.findOne({ countryName });

    if (existence) {
      res.send({
        statusCode: httpStatus[409],
        success: false,
        message: "The country already enlisted",
        data: null,
      });
    } else {
      uploadCountryImage(req, res, async (err) => {
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

        const addResult = await Club.create({
          countryName,
          image: fileUrl,
        });
        res.send({
          statusCode: httpStatus[201],
          success: true,
          message: "Country added successfully",
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
