const express = require("express");
const router = express.Router();
const clubController = require("../controller/club.controller");
const clubSchema = require("../validate/club.validate");
const validateRequest = require("../middlewares/validateRequest");

router.get("/", clubController.getClubs);
// router.post("/", validateRequest(playerSchema), clubController.createPlayer);
router.post("/", clubController.createClub);
router.patch("/:id", clubController.updateClub);
router.delete("/:id", clubController.deleteClub);

module.exports = router;
