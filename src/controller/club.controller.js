const clubService = require("../services/club.service");
const httpStatus = require("http-status");
const {
  success_msg,
  err_msg,

  sendErrorResponse,
  sendFetchResponse,
  sendCreateResponse,
  sendDeletionResponse,
  sendUpdateResponse,
  err_custom,
} = require("../util/responseHandler");
const { uploadClubImage } = require("../util/fileHandle");
const Club = require("../model/club.model");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { operableEntities } = require("../config/constants");
const unlinkAsync = promisify(fs.unlink);
//

async function getClubsAll(req, res) {
  //
  const result = await clubService.getClubsAll();
  //
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.clubs });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.clubs });
  }
}
//
async function getClubs(req, res) {
  //
  const result = await clubService.getClubs(req.query);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.clubs });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.clubs });
  }
}

async function createClub(req, res) {
  try {
    uploadClubImage(req, res, async (err) => {
      const clubName = req.body.clubName;

      if (err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }
      if (!req.file) {
        return res.status(400).json({ error: "Please send file" });
      }

      const fileUrl = `${req.protocol}://${req.get(
        "host"
      )}/public/club-images/${req.file.filename}`;
      //
      try {
        const addResult = await Club.create({
          clubName,
          image: fileUrl,
        });
        sendCreateResponse({
          res,
          data: addResult,
          what: operableEntities.club,
        });
      } catch (error) {
        await unlinkAsync(req.file.path);
        sendErrorResponse({
          error: err_custom.already_exist,
          what: operableEntities.club,
        });
      }
    });
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.club });
  }
}
//
async function updateClub(req, res) {
  const result = await clubService.updateClub({
    id: req.params.id,
    data: req.body,
  });
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.club });
  } else {
    sendUpdateResponse({ res, data: result, what: operableEntities.club });
  }
}
//
async function deleteClub(req, res) {
  const result = await clubService.deleteClub(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.club });
  } else {
    sendDeletionResponse({ res, data: result, what: operableEntities.club });
  }
}

module.exports = {
  getClubs,
  getClubsAll,
  createClub,
  updateClub,
  deleteClub,
};
