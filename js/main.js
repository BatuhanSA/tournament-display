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
        <h2 class="center">
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
                document.querySelector(`.card[data-id="${tournamentID}"] .first`).innerHTML = `
                    <span>#1:</span><span><em>${results["records"][0]["name"]}</em></span>
                `;
                document.querySelector(`.card[data-id="${tournamentID}"] .second`).innerHTML = `
                    <span>#2:</span><span><em>${results["records"][1]["name"]}</em></span>
                `;
                document.querySelector(`.card[data-id="${tournamentID}"] .third`).innerHTML = `
                    <span>#3:</span><span><em>${results["records"][2]["name"]}</em></span>
                `;
            });
        });

        tournamentsHTML += `
            <a href=#tournament?tournamentID=${tournamentID} class="card" data-id="${tournamentID}">
                <h3 class="center">
                    ${tournamentID}
                </h3>
                <div>
                    <div class="card-item first"></div>
                    <div class="card-item second"></div>
                    <div class="card-item third"></div>
                </div>
            </a>
        `;
    }

    homeHTML += `<div class="card-area">${tournamentsHTML}</div>`
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
        <div class="center">
            <h2>Tournament ${tournamentID}</h2>
        </div>
        <div class="tournament-rankings-area">
            <div class="center">
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
        <h2 class="center">
            ${redTeamName} vs. ${blueTeamName}
        </h2>
        <h2 class="center">
            Tournament <a href=#tournament?tournamentID=${tournamentID}>${tournamentID}</a>
        </h2>
    `;

    let redTeamHTML = `
        <div class="card-item">
            <span>Name:</span>
            <a href=#team?teamName=${redTeamName}&tournamentID=${tournamentID}>
                ${redTeamName}
            </a>
        </div>
        <div class="card-item">
            <span>Wins:</span>
            <span>${result["red"]["wins"]}</span>
        </div>
        <div class="card-item">
            <span>Ties:</span>
            <span>${result["red"]["ties"]}</span>
        </div>
        <div class="card-item">
            <span>Losses:</span>
            <span>${result["red"]["losses"]}</span>
        </div>
        <div class="card-item">
            <span>Crashes:</span>
            <span>${result["red"]["crashes"]}</span>
        </div>
        <div class="card-item">
            <span>Timeouts:</span>
            <span>${result["red"]["timeouts"]}</span>
        </div>
    `;

    let blueTeamHTML = `
        <div class="card-item">
            <span>Name:</span>
            <a href=#team?teamName=${blueTeamName}&tournamentID=${tournamentID}>
                ${blueTeamName}
            </a>
        </div>
        <div class="card-item">
            <span>Wins:</span>
            <span>${result["blue"]["wins"]}</span>
        </div>
        <div class="card-item">
            <span>Ties:</span>
            <span>${result["blue"]["ties"]}</span>
        </div>
        <div class="card-item">
            <span>Losses:</span>
            <span>${result["blue"]["losses"]}</span>
        </div>
        <div class="card-item">
            <span>Crashes:</span>
            <span>${result["blue"]["crashes"]}</span>
        </div>
        <div class="card-item">
            <span>Timeouts:</span>
            <span>${result["blue"]["timeouts"]}</span>
        </div>
    `;

    matchHTML += `
        <div class="card-area">
            <div class="card" data-clickable="false">
                <div class="card-item">
                    <span>Full Match Stats:</span>
                    <a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_matchstats.json" download>
                        Download
                    </a>
                </div>
                <div class="card-item">
                    <span>All Games:</span>
                    <a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}.zip" download>
                        Download
                    </a>
                </div>
            </div>
        </div>
        <div class="card-area">
            <div class="card" data-clickable="false">
                <h4 class="center">
                    Red Team
                </h4>
                ${redTeamHTML}
            </div>
            <div class="card" data-clickable="false">
                <h4 class="center">
                    Blue Team
                </h4>
                ${blueTeamHTML}
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
            <div class="card">
                <h4 class="center">
                    <a href=#team?teamName=${blueTeamName}&tournamentID=${tournamentID}>
                        ${redTeamName}
                    </a>
                    vs.
                    <a href=#team?teamName=${blueTeamName}&tournamentID=${tournamentID}>
                        ${blueTeamName}
                    </a>
                </h4>
                <img
                    src=${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_${paddedID}.webp
                    href=${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_${paddedID}.webp
                />
                <div class="game-metadata-area">
                    <div class="card-item">
                        <span>
                            Download:
                            <a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_${paddedID}.log" download>Log</a>,
                            <a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_${paddedID}.replay" download>Replay</a>
                        </span>
                    </div>
                    <div class="card-item">
                        <span>Score: ${result.scores[i]}</span>
                    </div>
                    <div class="card-item">
                        <span>Board: ${result.boards[i]}</span>
                    </div>
                    <div class="card-item">
                        <span>Game ID: ${paddedID}</span>
                    </div>
                    <div class="card-item">
                        <span>Total Time: ${result.times[i].toFixed(2)}</span>
                    </div>
                    <div class="card-item">
                        <span>Red Time: ${result.red.times[i].toFixed(2)}</span>
                    </div>
                    <div class="card-item">
                        <span>Blue Time: ${result.blue.times[i].toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    matchHTML += `
        <div class="card-area">
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
        ranks.set(record["name"], i + 1);

        if (record["name"] != teamName){
            continue;
        }

        tournamentStatsHTML += `
            <div class="card-item">
                <span>Wins:</span>
                <span>${record["wins"]}</span>
            </div>
            <div class="card-item">
                <span>Losses:</span>
                <span>${record["losses"]}</span>
            </div>
            <div class="card-item">
                <span>Ties:</span>
                <span>${record["ties"]}</span>
            </div>
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
            <a class="card" href=#match?tournamentID=${tournamentID}&redTeam=${redTeamName}&blueTeam=${blueTeamName}>
                <span class="match-metadata" data-team="red">
                    ${match["red"]["name"]}
                </span>
                <span class="match-metadata" data-team="red">
                    <span class="team-rank">
                        Rank #${ranks.get(match["red"]["name"])}
                    </span>
                    <div class="team-color-box" data-team="red"></div>
                </span>
                <span class="match-metadata">
                    ${match["red"]["wins"]} - ${match["blue"]["wins"]}
                </span>
                <span class="match-metadata" data-team="blue">
                    <div class="team-color-box" data-team="blue"></div>
                    <span class="team-rank">
                        Rank #${ranks.get(match["blue"]["name"])}
                    </span>
                </span>
                <span class="match-metadata" data-team="blue">
                    ${match["blue"]["name"]}
                </span>
            </a>
        `;
    }

    let teamHTML = `
        <h2 class="center">
            ${teamName}
        </h2>
        <h3 class="center">
            Tournament <a href=#tournament?tournamentID=${tournamentID}>${tournamentID}</a>
        </h3>
        <div class="card-area">
            <div></div>
            <div class="card" data-clickable="false">
                <h4 class="center">Stats</h4>
                ${tournamentStatsHTML}
            </div>
            <div></div>
        </div>
        <div class="card-area">
            ${matchStatsCards}
        </div>
    `;

    content.innerHTML = teamHTML;
    edq.util.table.enableSortingAll();
}

document.addEventListener("DOMContentLoaded", main);
