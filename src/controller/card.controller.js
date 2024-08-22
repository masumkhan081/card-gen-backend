const cardService = require("../services/card.service");
const httpStatus = require("http-status");
const { success_msg, err_msg } = require("../util/responseHandler");
const { uploadCardImage } = require("../util/fileHandle");
const Card = require("../model/card.model");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
//


async function getCardsAll(req, res) {
  //
  const result = await cardService.getCardsAll();
  //
  res.send({
    statusCode: result ? 200 : 404,
    success: result ? true : false,
    message: result ? success_msg.fetch("Cards") : err_msg.no_data,
    data: result,
  });
}


async function getCards(req, res) {
  //
  const result = await cardService.getCards(req.query);
  //
  res.send({
    statusCode: result ? 200 : 404,
    success: result ? true : false,
    message: result ? success_msg.fetch("Clubs") : err_msg.no_data,
    data: result,
  });
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
      //
      const existence = await Card.findOne({ cardName });

      if (existence) {
        await unlinkAsync(req.file.path);

        res.send({
          statusCode: httpStatus[409],
          success: false,
          message: "A card already exist with this name",
          data: null,
        });
      } else {
        const addResult = await Card.create({
          cardName,
          image: fileUrl,
        });
        res.send({
          statusCode: httpStatus[201],
          success: true,
          message: "Card saved successfully",
          data: addResult,
        });
      }
    });
  } catch (err) {
    res.send(JSON.stringify(err));
  }
}
//
async function updateCard(req, res) {
  const result = await cardService.updateCard({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteCard(req, res) {
  const result = await cardService.deleteCard(req.params.id);
  res.send(result);
}

module.exports = {
  getCards,
  getCardsAll,
  createCard,
  updateCard,
  deleteCard,
};
