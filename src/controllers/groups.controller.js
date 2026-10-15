const groups = require("../data/groups");

function getGroups(req, res) {
    try {
        res.json({ groups });
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar grupos" });
    }
}

module.exports = { getGroups };