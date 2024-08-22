const express = require("express");
const router = express.Router();
const leagueController = require("../controller/league.controller");
// const clubSchema = require("../validate/club.validate");
const validateRequest = require("../middlewares/validateRequest");
//
router.get("/", leagueController.getLeagues);
router.get("/all", leagueController.getLeaguesAll);

// router.post("/", validateRequest(playerSchema), leagueController.createPlayer);
router.post("/", leagueController.createLeague);
router.patch("/:id", leagueController.updateLeague);
router.delete("/:id", leagueController.deleteLeague);

module.exports = router;
