const express = require("express");
const router = express.Router();
const countryController = require("../controller/country.controller");
const countrySchema = require("../validate/country.validate");
const validateRequest = require("../middlewares/validateRequest");

router.get("/", countryController.getCountries);
// router.post("/", validateRequest(playerSchema), countryController.createPlayer);
router.post("/", countryController.createCountry);
router.patch("/:id", countryController.updateCountry);
router.delete("/:id", countryController.deleteCountry);

module.exports = router;
