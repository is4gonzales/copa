const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMzE2NjhlNWE5YjM0NGQyYmI5NWYwYSIsImlhdCI6MTc4MTYyMzE1NCwiZXhwIjoxNzg4ODgwNzU0fQ.RixDkWQue9VBfH_bqv72kOibAlXQliz4B55HqXzon10";

const headers = {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json"
};

const API = "http://127.0.0.1:3000";

const status = document.getElementById("status");

function mostrarErro(msg) {
    status.textContent = msg;
    status.style.color = "red";
}

function limparErro() {
    status.textContent = "";
}

function atualizarHorario() {
    document.getElementById("ultimaAtualizacao").textContent =
        "Última atualização: " +
        new Date().toLocaleTimeString("pt-BR");
}

async function carregarTimes() {
    try {
        const res = await fetch(`${API}/teams`);
        const data = await res.json();

        console.log("TIMES:", data);

        const teams = data.teams || [];

        document.getElementById("totalTimes").textContent = teams.length;

        const container = document.getElementById("listaSelecoes");
        container.innerHTML = "";

        teams.forEach(team => {
            container.innerHTML += `
                <div class="team-card">
                    <h3>${team.name}</h3>
                    <p>Grupo ${team.group}</p>
                </div>
            `;
        });

    } catch (err) {
        mostrarErro("Erro ao carregar times");
        console.error(err);
    }
}

async function carregarJogos() {
    try {
        const res = await fetch(`${API}/games`);
        const data = await res.json();

        console.log("JOGOS:", data);

        const jogos = data.games || [];

        const destaque = document.getElementById("jogosDestaque");
        const proximos = document.getElementById("proximosJogos");

        destaque.innerHTML = "";
        proximos.innerHTML = "";

        jogos.slice(0, 6).forEach(jogo => {
            destaque.innerHTML += `
                <div class="game-card">
                    <h3>${jogo.home} x ${jogo.away}</h3>
                    <p>${jogo.date}</p>
                    <p>${jogo.scoreHome ?? "-"} x ${jogo.scoreAway ?? "-"}</p>
                </div>
            `;
        });

        jogos.slice(6, 12).forEach(jogo => {
            proximos.innerHTML += `
                <div class="game-card">
                    <h3>${jogo.home} x ${jogo.away}</h3>
                    <p>${jogo.date}</p>
                </div>
            `;
        });

    } catch (err) {
        mostrarErro("Erro ao carregar jogos");
        console.error(err);
    }
}

async function carregarGrupos() {
    try {
        const res = await fetch(`${API}/groups`);
        const data = await res.json();

        console.log("GRUPOS:", data);

        const grupos = data.groups || [];

        const container = document.getElementById("listaGrupos");
        container.innerHTML = "";

        grupos.forEach(grupo => {

            let html = `
                <div class="grupo">
                    <h3>Grupo ${grupo.group}</h3>
                    <ul>
            `;

            grupo.teams.forEach(time => {
                html += `<li>${time}</li>`;
            });

            html += `
                    </ul>
                </div>
            `;

            container.innerHTML += html;
        });

    } catch (err) {
        mostrarErro("Erro ao carregar grupos");
        console.error(err);
    }
}

async function carregarEstadios() {
    try {
        const res = await fetch(`${API}/stadiums`);
        const data = await res.json();

        console.log("ESTÁDIOS:", data);

        const stad = data.stadiums || [];

        const container = document.getElementById("listaEstadios");
        container.innerHTML = "";

        stad.forEach(s => {
            container.innerHTML += `
                <div class="team-card">
                    <h3>${s.name}</h3>
                    <p>${s.city}</p>
                </div>
            `;
        });

    } catch (err) {
        console.error("Erro estádios:", err);
    }
}

document.getElementById("buscarTime").addEventListener("input", function () {
    const valor = this.value.toLowerCase();

    const cards = document.querySelectorAll(".team-card");

    cards.forEach(card => {
        const texto = card.textContent.toLowerCase();

        card.style.display = texto.includes(valor)
            ? "block"
            : "none";
    });
});

async function atualizarTudo() {
    limparErro();

    await carregarTimes();
    await carregarJogos();
    await carregarGrupos();
    await carregarEstadios();

    atualizarHorario();
}

document.getElementById("btnAtualizar")
    .addEventListener("click", atualizarTudo);

atualizarTudo();

// atualização automática
setInterval(atualizarTudo, 60000);