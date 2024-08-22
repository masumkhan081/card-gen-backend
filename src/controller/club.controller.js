const clubService = require("../services/club.service");
const httpStatus = require("http-status");
const { success_msg, err_msg } = require("../util/responseHandler");
const { uploadClubImage } = require("../util/fileHandle");
const Club = require("../model/club.model");
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
  try {
    const clubName = req.body.clubName;
    const existence = await Club.findOne({ clubName });

    if (existence) {
      res.send({
        statusCode: httpStatus[409],
        success: false,
        message: "The club already exist",
        data: null,
      });
    } else {
      uploadClubImage(req, res, async (err) => {
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

        const addResult = await Club.create({
          clubName,
          image: fileUrl,
        });
        res.send({
          statusCode: httpStatus[201],
          success: true,
          message: "Club saved successfully",
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
