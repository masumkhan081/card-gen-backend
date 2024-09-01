const countryService = require("../services/country.service");
const httpStatus = require("http-status");
const { success_msg, err_msg, err_custom } = require("../util/responseHandler");
const Country = require("../model/country.model");
const { uploadCountryImage } = require("../util/fileHandle");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { operableEntities } = require("../config/constants");
const unlinkAsync = promisify(fs.unlink);
//

async function getCountriesAll(req, res) {
  //
  const result = await countryService.getCountriesAll();
  if (result instanceof Error) {
    res.send(
      getErrorResponse({ error: result, what: operableEntities.country })
    );
  } else {
    res.send({
      statusCode: result ? 200 : 404,
      success: result ? true : false,
      message: result ? success_msg.fetch("Countries") : err_msg.no_data,
      data: result,
    });
  }
}

async function getCountries(req, res) {
  //
  const result = await countryService.getCountries(req.query);
  //
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.countries });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.countries });
  }
}
//

async function createCountry(req, res) {
  try {
    console.log("country upload to be ok !");

    uploadCountryImage(req, res, async (err) => {
      const countryName = req.body.countryName;

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

      try {
        const addResult = await Country.create({
          countryName,
          image: fileUrl,
        });

        sendCreateResponse({
          res,
          what: operableEntities.country,
          data: addResult,
        });
      } catch (error) {
        await unlinkAsync(req.file.path);
        sendErrorResponse({
          error: err_custom.already_exist,
          what: operableEntities.country,
        });
      }
    });
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.country });
  }
}
//
async function updateCountry(req, res) {
  const result = await countryService.updateCountry({
    id: req.params.id,
    data: req.body,
  });
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.country });
  } else {
    sendUpdateResponse({ res, data: result, what: operableEntities.country });
  }
}
//
async function deleteCountry(req, res) {
  const result = await countryService.deleteCountry(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.country });
  } else {
    sendDeletionResponse({ res, data: result, what: operableEntities.country });
  }
}

module.exports = {
  getCountries,
  getCountriesAll,
  createCountry,
  updateCountry,
  deleteCountry,
};
