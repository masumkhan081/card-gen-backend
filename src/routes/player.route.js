const express = require("express");
const router = express.Router();
const playerController = require("../controller/player.controller");
const playerSchema = require("../validate/player.validate");
const validateRequest = require("../middlewares/validateRequest");

router.get("/", playerController.getPlayers);
router.get("/:id", playerController.getPlayer);
//  validateRequest(playerSchema)
router.post("/", playerController.createPlayer);
router.patch("/:id", playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);

module.exports = router;
