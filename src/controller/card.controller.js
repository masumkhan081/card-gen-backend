const cardService = require("../services/card.service");
const httpStatus = require("http-status");
const {
  success_msg,
  err_msg,
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
  err_custom,
} = require("../util/responseHandler");
const { uploadCardImage } = require("../util/fileHandle");
const Card = require("../model/card.model");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { operableEntities } = require("../config/constants");
const unlinkAsync = promisify(fs.unlink);
//

async function getCardsAll(req, res) {
  //
  const result = await cardService.getCardsAll({ res: res });
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.cards });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.cards });
  }
}

async function getCards(req, res) {
  //
  const result = await cardService.getCards(req.query);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.cards });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.cards });
  }
}

async function createCard(req, res) {
  try {
    uploadCardImage(req, res, async (err) => {
      const cardName = req.body.cardName;

      if (err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }
      if (!req.file) {
        return res.status(400).json({ error: "Please send file" });
      }

      const fileUrl = `${req.protocol}://${req.get(
        "host"
      )}/public/card-images/${req.file.filename}`;

      // console.log("fileUrl------------ : " + req.file.path);

      try {
        const addResult = await Card.create({
          cardName,
          image: fileUrl,
        });
        sendCreateResponse({
          res,
          what: operableEntities.card,
          data: addResult,
        });
      } catch (error) {
        await unlinkAsync(req.file.path);
        sendErrorResponse({ res, error, what: operableEntities.card });
      }
    });
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.card });
  }
}
//
async function updateCard(req, res) {
  try {
    const updateCardId = req.params.id;
    let fileUrl;

    uploadCardImage(req, res, async (err) => {
      const cardName = req.body.cardName;
      if (err) {
        return res.status(500).json({ error: "error saving file" });
      }
      if (!req.file) {
        return res.status(400).json({ error: "Please send card image" });
      }

      const fileUrl = `${req.protocol}://${req.get(
        "host"
      )}/public/card-images/${req.file.filename}`;

      try {
        const result = await cardService.updateCard({
          id: updateCardId,
          data: {
            cardName,
            image: fileUrl,
          },
        });
        if (result instanceof Error) {
          sendErrorResponse({
            res,
            error: result,
            what: operableEntities.card,
          });
        } else {
          sendUpdateResponse({
            res,
            data: result,
            what: operableEntities.card,
          });
        }
      } catch (error) {
        await unlinkAsync(req.file.path);
        sendErrorResponse({ res, error, what: operableEntities.card });
      }
    });
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.card });
  }
}
//
async function deleteCard(req, res) {
  const result = await cardService.deleteCard(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.card });
  } else {
    sendDeletionResponse({ res, data: result, what: operableEntities.card });
  }
}

module.exports = {
  getCards,
  getCardsAll,
  createCard,
  updateCard,
  deleteCard,
};
