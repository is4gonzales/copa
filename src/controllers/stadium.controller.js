const stadiums = require("../data/stadiums");

function getStadiums(req, res) {
    try {
        res.json({ stadiums });
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar estádios" });
    }
}

module.exports = { getStadiums };