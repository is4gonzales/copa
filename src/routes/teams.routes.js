const express = require("express");
const router = express.Router();

const { getTeams } = require("../controllers/teams.controller");

router.get("/", getTeams);

module.exports = router;