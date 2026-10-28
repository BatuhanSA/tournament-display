import * as edq from '../vendor/edq/js/edq.mjs';

function main() {
    loadRouting();
}

function loadRouting() {
    edq.core.routing.addRoute(new edq.core.routing.StringRoute('', routeHome));
    edq.core.routing.addRoute(new edq.core.routing.StringRoute('home', routeHome));
    edq.core.routing.addRoute(new edq.core.routing.StringRoute('tournament', routeTournament));
    edq.core.routing.addRoute(new edq.core.routing.StringRoute('match', routeMatch));
    edq.core.routing.addRoute(new edq.core.routing.StringRoute('team', routeTeam));

    // TODO(Batu): Set the fallback handler.

    edq.core.routing.init();
    edq.core.routing.route();
}

function routeHome(request) {
    fetchHome();
}

function routeTournament(request) {
    fetchTournament(request.params.tournamentID);
}

function routeMatch(request) {
    fetchMatch(request.params.tournamentID, request.params.redTeam, request.params.blueTeam);
}

function routeTeam(request) {
    fetchTeam(request.params.tournamentID, request.params.teamName);
}

function fetchHome() {
    fetch("./tournament/results").then(function(response) {
        response.text().then(renderHome);
    });
}

function renderHome(text) {
    let content = document.querySelector(".content");
    let element = document.createElement("div");
    element.innerHTML = text;

    let homeHTML = `
        <h2 class="page-title">
            Tournaments
        </h2>
    `;

    let tournamentsHTML = ``;
    for (const link of element.querySelectorAll("li a")) {
        let tournamentID = link.getAttribute("href").replace(/\/$/, "");
        if (!tournamentID.match(/^\d+$/)) {
            continue;
        }

        fetch(`./tournament/results/${tournamentID}/results.json`).then(function(response) {
            response.json().then(function(results) {
                document.querySelector(`.tournament-card[data-id="${tournamentID}"] .first`).innerHTML = `
                    <span>#1:</span><span><em>${results["records"][0]["name"]}</em></span>
                `;
                document.querySelector(`.tournament-card[data-id="${tournamentID}"] .second`).innerHTML = `
                    <span>#2:</span><span><em>${results["records"][1]["name"]}</em></span>
                `;
                document.querySelector(`.tournament-card[data-id="${tournamentID}"] .third`).innerHTML = `
                    <span>#3:</span><span><em>${results["records"][2]["name"]}</em></span>
                `;
            });
        });

        tournamentsHTML += `
            <a href=#tournament?tournamentID=${tournamentID} class="tournament-card" data-id="${tournamentID}">
                <h3 class="tournament-title">
                    ${tournamentID}
                </h3>
                <div class="tournament-card-item first"></div>
                <div class="tournament-card-item second"></div>
                <div class="tournament-card-item third"></div>
            </a>
        `;
    }

    homeHTML += `<div class=tournament-card-area>${tournamentsHTML}</div>`
    content.innerHTML = homeHTML;
}

function fetchTournament(tournamentID) {
    fetch(`./tournament/results/${tournamentID}/results.json`).then(function(response) {
        response.json().then(function(result) {
            renderTournament(tournamentID, result);
        });
    });
}

function renderTournament(tournamentID, data) {
    let content = document.querySelector(".content");

    let rankingsTableHTML = `
        <thead>
            <tr>
                <th>Rank</th>
                <th>Team Name</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Ties</th>
            </tr>
        </thead>
    `;

    let rankingsTableBodyHTML = ``;
    for(const [i, record] of data["records"].entries()) {
        rankingsTableBodyHTML += `
            <tr>
                <td>#${i + 1}</td>
                <td>
                    <a href=#team?teamName=${record["name"]}&tournamentID=${tournamentID}>${record["name"]}</a>
                </td>
                <td>${record["wins"]}</td>
                <td>${record["losses"]}</td>
                <td>${record["ties"]}</td>
            </tr>
        `;
    }

    rankingsTableHTML += `<tbody>${rankingsTableBodyHTML}</tbody>`

    let tournamentHTML = `
        <div class="page-title">
            <h2>Tournament ${tournamentID}</h2>
        </div>
        <div class="tournament-rankings-area">
            <div class="tournament-rankings-title">
                <h2>Rankings</h2>
            </div>
            <div class="tournament-rankings">
                <table class="sortable-table">${rankingsTableHTML}</table>
            </div>
        </div>
    `;

    content.innerHTML = tournamentHTML;
    edq.util.table.enableSortingAll();
}

function fetchMatch(tournamentID, redTeam, blueTeam) {
    let matchBaseDir = `./tournament/results/${tournamentID}/matches/${tournamentID}_${redTeam}_vs_${blueTeam}`;
    fetch(`${matchBaseDir}/${tournamentID}_${redTeam}_vs_${blueTeam}_matchstats.json`).then(function(response) {
        response.json().then(function(result) {
            renderMatch(tournamentID, matchBaseDir, result);
        });
    });
}

function renderMatch(tournamentID, matchBaseDir, result) {
    let content = document.querySelector(".content");
    let redTeamName = result["red"]["name"];
    let blueTeamName = result["blue"]["name"];
    let matchHTML = `
        <div class="page-title">
            <h2>
                Tournament
                <a href=#tournament?tournamentID=${tournamentID}>${tournamentID}</a>
                Matchup Stats -- ${redTeamName} vs. ${blueTeamName}
            </h2>
        </div>
        <div class="match-stats-tite">
            <h3>
                Match Stats
                (<a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_matchstats.json" download>
                    Download Full Match Stats
                </a>)
            </h3>
        </div>
    `;

    let redTeamHTML = `
        <div class="team-stats-card-item">
            Name: <a href=#team?teamName=${redTeamName}&tournamentID=${tournamentID}>${redTeamName}</a>
        </div>
        <div class="team-stats-card-item">
            Wins: ${result["red"]["wins"]}
        </div>
        <div class="team-stats-card-item">
            Ties: ${result["red"]["ties"]}
        </div>
        <div class="team-stats-card-item">
            Losses: ${result["red"]["losses"]}
        </div>
        <div class="team-stats-card-item">
            Crashes: ${result["red"]["crashes"]}
        </div>
        <div class="team-stats-card-item">
            Timeouts: ${result["red"]["timeouts"]}
        </div>
    `;

    let blueTeamHTML = `
        <div class="team-stats-card-item">
            Name: <a href=#team?teamName=${blueTeamName}&tournamentID=${tournamentID}>${blueTeamName}</a>
        </div>
        <div class="team-stats-card-item">
            Wins: ${result["blue"]["wins"]}
        </div>
        <div class="team-stats-card-item">
            Ties: ${result["blue"]["ties"]}
        </div>
        <div class="team-stats-card-item">
            Losses: ${result["blue"]["losses"]}
        </div>
        <div class="team-stats-card-item">
            Crashes: ${result["blue"]["crashes"]}
        </div>
        <div class="team-stats-card-item">
            Timeouts: ${result["blue"]["timeouts"]}
        </div>
    `;

    matchHTML += `
        <div class="match-stats-card-area">
            <div class="team-card-area">
                <div class="team-card-title">
                    <h4>Red Team</h4>
                </div>
                <div class="team-stats-card-area">
                    ${redTeamHTML}
                </div>
            </div>
            <div class="team-card-area">
                <div class="team-card-title">
                    <h4>Blue Team</h4>
                </div>
                <div class="team-stats-card-area">
                    ${blueTeamHTML}
                </div>
            </div>
        </div>
    `;

    let gamesTableHTML = `
        <thead>
            <tr>
                <th>WebP</th>
                <th>Logs</th>
                <th>Replay</th>
                <th>ID</th>
                <th>Layout</th>
                <th>Score</th>
                <th>Total Time</th>
                <th>Red Time</th>
                <th>Blue Time</th>
            </tr>
        </thead>
    `;

    let gamesCards = ``;
    for (let i = 0; i < result.boards.length; i++) {
        let paddedID = i.toString().padStart(3, '0');
        gamesCards += `
            <div class="game-card">
                <div class="game-img">
                    <a href=${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_${paddedID}.webp>
                        <img src=${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_${paddedID}.webp width="300">
                    </a>
                </div>
                <div class="game-info-area">
                    <div class="game-info-item">
                        <a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_${paddedID}.log" download>
                            Log
                        </a>
                    </div>
                    <div class="game-info-item">
                        <a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_${paddedID}.replay" download>
                            Replay
                        </a>
                    </div>
                    <div class="game-info-item">
                        Game ID: ${paddedID}
                    </div>
                    <div class="game-info-item">
                        Board: ${result.boards[i]}
                    </div>
                    <div class="game-info-item">
                        Score: ${result.scores[i]}
                    </div>
                    <div class="game-info-item">
                        Total Time: ${result.times[i]}
                    </div>
                    <div class="game-info-item">
                        Red Time: ${result.red.times[i]}
                    </div>
                    <div class="game-info-item">
                        Blue Time: ${result.blue.times[i]}
                    </div>
                </div>
            </div>
        `;
    }

    matchHTML += `
        <div class="games-tite">
            <h3>
                Games
                (<a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}.zip" download>
                    Download All Games
                </a>)
            </h3>
        </div>
        <div class="games-card-area">
            ${gamesCards}
        </div>
    `;

    content.innerHTML = matchHTML;
    edq.util.table.enableSortingAll();
}

function fetchTeam(tournamentID, teamName) {
    fetch(`./tournament/results/${tournamentID}/results.json`).then(function(response) {
        response.json().then(function(result) {
            renderTeam(tournamentID, teamName, result);
        });
    });
}

function renderTeam(tournamentID, teamName, result) {
    let content = document.querySelector(".content");

    const ranks = new Map();
    let tournamentStatsHTML = ``;
    for(const [i, record] of result["records"].entries()) {
        ranks.set(record["name"], i);

        if (record["name"] != teamName){
            continue;
        }

        tournamentStatsHTML += `
            <span>
                Wins: ${record["wins"]}
            </span>
            <span>
                Losses: ${record["losses"]}
            </span>
            <span>
                Ties: ${record["ties"]}
            </span>
        `;
    }

    let matchStatsCards = ``;
    for(const [i, match] of result["matches"].entries()) {
        let redTeamName = match["red"]["name"];
        let blueTeamName = match["blue"]["name"];

        if (redTeamName != teamName &&  blueTeamName != teamName) {
            continue;
        }

        let matchBaseDir = `./tournament/results/${tournamentID}/matches/${tournamentID}_${redTeamName}_vs_${blueTeamName}`;

        matchStatsCards += `
            <a class="match-stats-card" href=#match?tournamentID=${tournamentID}&redTeam=${redTeamName}&blueTeam=${blueTeamName}>
                <div class="match-stats-card-item" data-team="red">
                    ${match["red"]["name"]}
                </div>
                <div class="match-stats-card-item" data-team="red">
                    <div class="team-rank">
                        #${ranks.get(match["red"]["name"])}
                    </div>
                    <div class="tem-color">
                        red
                    </div>
                </div>
                <div class="match-stats-card-item">
                    ${match["red"]["wins"]}W/${match["red"]["ties"]}T/${match["red"]["losses"]}L
                    ${match["red"]["wins"]} - ${match["blue"]["wins"]}
                    ${match["blue"]["wins"]}W/${match["blue"]["ties"]}T/${match["blue"]["losses"]}L
                </div>
                <div class="match-stats-card-item" data-team="blue">
                    <div class="tem-color">
                        blue
                    </div>
                    <div class="team-rank">
                        #${ranks.get(match["blue"]["name"])}
                    </div>
                </div>
                <div class="match-stats-card-item" data-team="blue">
                    ${match["blue"]["name"]}
                </div>
            </a>
        `;
    }

    let teamHTML = `
        <h2 class="page-title">
            ${teamName}
        </h2>
        <h3 class="page-title">
            Tournament <a href=#tournament?tournamentID=${tournamentID}>${tournamentID}</a>
        </h3>
        <div class="tournament-stats-area">
            ${tournamentStatsHTML}
        </div>
        <div class="tournament-match-stats-area">
            ${matchStatsCards}
        </div>
    `;

    content.innerHTML = teamHTML;
    edq.util.table.enableSortingAll();
}

document.addEventListener("DOMContentLoaded", main);
