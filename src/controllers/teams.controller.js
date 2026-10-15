const teams = require("../data/teams");

function getTeams(req, res) {
    try {
        res.json({ teams });
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar times" });
    }
}

module.exports = { getTeams };