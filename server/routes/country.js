const express = require('express');
const router = express.Router();
const {getCountries} = require('../controllers/country_controller');

router.get("/all", getCountries);

module.exports = router;