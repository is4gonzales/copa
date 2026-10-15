const games = require("../data/games");

function getGames(req, res) {
    try {
        res.json({ games });
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar jogos" });
    }
}

module.exports = { getGames };