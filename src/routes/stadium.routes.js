const express = require("express");
const router = express.Router();

const { getStadiums } = require("../controllers/stadiums.controller");

router.get("/", getStadiums);

module.exports = router;