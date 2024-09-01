const leagueService = require("../services/league.service");
const httpStatus = require("http-status");
const { success_msg, err_msg, err_custom } = require("../util/responseHandler");
const { uploadLeagueImage } = require("../util/fileHandle");
const League = require("../model/league.model");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { operableEntities } = require("../config/constants");
const unlinkAsync = promisify(fs.unlink);
//

async function getLeaguesAll(req, res) {
  //
  const result = await leagueService.getLeaguesAll();
  //
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.leagues });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.leagues });
  }
}

async function getLeagues(req, res) {
  //
  const result = await leagueService.getLeagues(req.query);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.leagues });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.leagues });
  }
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
      try {
        const addResult = await League.create({
          leagueName,
          image: fileUrl,
        });
        sendCreateResponse({
          res,
          what: operableEntities.league,
          data: addResult,
        });
      } catch (error) {
        await unlinkAsync(req.file.path);
        sendErrorResponse({
          error: err_custom.already_exist,
          what: operableEntities.league,
        });
      }
    });
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.league });
  }
}
//
async function updateLeague(req, res) {
  const result = await leagueService.updateLeague({
    id: req.params.id,
    data: req.body,
  });
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.league });
  } else {
    sendUpdateResponse({ res, data: result, what: operableEntities.league });
  }
}
//
async function deleteLeague(req, res) {
  const result = await leagueService.deleteLeague(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.league });
  } else {
    sendDeletionResponse({ res, data: result, what: operableEntities.league });
  }
}

module.exports = {
  getLeagues,
  getLeaguesAll,
  createLeague,
  updateLeague,
  deleteLeague,
};
