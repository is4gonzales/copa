const express = require("express");
const cors = require("cors");

const teamsRoutes = require("./routes/teams.routes");
const gamesRoutes = require("./routes/games.routes");
const groupsRoutes = require("./routes/groups.routes");
const stadiumsRoutes = require("./routes/stadiums.routes");

const app = express();

app.use(cors());
app.use(express.json());

// ROTAS
app.use("/teams", teamsRoutes);
app.use("/games", gamesRoutes);
app.use("/groups", groupsRoutes);
app.use("/stadiums", stadiumsRoutes);

// START SERVER
app.listen(3000, () => {
    console.log("🔥 API rodando em http://localhost:3000");
});

const path = require("path");

// serve arquivos estáticos
app.use(express.static(path.join(__dirname, "../frontend")));