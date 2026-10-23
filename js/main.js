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
        <div class="page-title">
            <h2>Tournaments</h2>
        </div>
    `;

    let tournamentsHTML = ``;
    for (const link of element.querySelectorAll("li a")) {
        let tournamentID = link.getAttribute("href").replace(/\/$/, "");
        if (!tournamentID.match(/^\d+$/)) {
            continue;
        }

        fetch(`./tournament/results/${tournamentID}/results.json`).then(function(response) {
            response.json().then(function(results) {
                document.querySelector(`.tournament-card[data-id="${tournamentID}"] .first`).textContent = `1st ${results["records"][0]["name"]}`;
                document.querySelector(`.tournament-card[data-id="${tournamentID}"] .second`).textContent = `2nd ${results["records"][1]["name"]}`;
                document.querySelector(`.tournament-card[data-id="${tournamentID}"] .third`).textContent = `3rd ${results["records"][2]["name"]}`;
            });
        });

        tournamentsHTML += `
            <div class="tournament-card" data-id="${tournamentID}">
                <div class="tournament-card-item">
                    <a href=#tournament?tournamentID=${tournamentID}>${tournamentID}</a>
                </div>
                <div class="tournament-card-item first"></div>
                <div class="tournament-card-item second"></div>
                <div class="tournament-card-item third"></div>
            </div>
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
            <h2>Tournament ${tournamentID} Rankings</h2>
        </div>
        <div class="tournament-rankings">
            <table>${rankingsTableHTML}</table>
        </div>
    `;

    content.innerHTML = tournamentHTML;
    edq.util.table.enableSortingAll();
}

function fetchMatch(tournamentID, redTeam, blueTeam) {
    let matchBaseDir = `./tournament/results/${tournamentID}/matches/${tournamentID}_${redTeam}_vs_${blueTeam}`;
    fetch(`${matchBaseDir}/${tournamentID}_${redTeam}_vs_${blueTeam}_matchstats.json`).then(function(response) {
        response.json().then(function(result) {
            renderMatch(tournamentID, result);
        });
    });
}

function renderMatch(tournamentID, result) {
    let content = document.querySelector(".content");
    let redTeamName = result["red"]["name"];
    let blueTeamName = result["blue"]["name"];
    let matchBaseDir = `./tournament/results/${tournamentID}/matches/${tournamentID}_${redTeamName}_vs_${blueTeamName}`;

    let matchHTML = `
        <h2>
            Capture the Flag Tournament
            <a href=#tournament?tournamentID=${tournamentID}>${tournamentID}</a>
            -- ${redTeamName} vs. ${blueTeamName}
        </h2>
        <h3>
            Match Stats
            (<a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_matchstats.json" download>Download Full Match Stats</a>)
        </h3>
    `;

    let redTeamHTML = `
        <h4>Red Team</h4>
        <p><label>Name:</label>
            <span>
                <a href=#team?teamName=${redTeamName}&tournamentID=${tournamentID}>${redTeamName}</a>
            </span>
        </p>
        <p><label>Wins:</label><span>${result["red"]["wins"]}</span></p>
        <p><label>Ties:</label><span>${result["red"]["ties"]}</span></p>
        <p><label>Losses:</label><span>${result["red"]["losses"]}</span></p>
        <p><label>Crashes:</label><span>${result["red"]["crashes"]}</span></p>
        <p><label>Timeouts:</label><span>${result["red"]["timeouts"]}</span></p>
    `;

    let blueTeamHTML = `
        <h4>Blue Team</h4>
        <p><label>Name:</label>
            <span>
                <a href=#team?teamName=${blueTeamName}&tournamentID=${tournamentID}>${blueTeamName}</a>
            </span>
        </p>
        <p><label>Wins:</label><span>${result["blue"]["wins"]}</span></p>
        <p><label>Ties:</label><span>${result["blue"]["ties"]}</span></p>
        <p><label>Losses:</label><span>${result["blue"]["losses"]}</span></p>
        <p><label>Crashes:</label><span>${result["blue"]["crashes"]}</span></p>
        <p><label>Timeouts:</label><span>${result["blue"]["timeouts"]}</span></p>
    `;

    matchHTML += redTeamHTML + blueTeamHTML;
    matchHTML += `
        <h3>
            Games
            (<a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}.zip" download>Download All Games</a>)
        </h3>
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

    let gamesTableInnerHTML = ``;
    for (let i = 0; i < result.boards.length; i++) {
        let paddedID = i.toString().padStart(3, '0');
        gamesTableInnerHTML += `
            <tr>
                <td>
                    <a href=${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_${paddedID}.webp>
                        <img src=${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_${paddedID}.webp width="300">
                    </a>
                </td>
                <td>
                    <a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_${paddedID}.log" download>Log</a>
                </td>
                <td>
                    <a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_${paddedID}.replay" download>Replay</a>
                </td>
                <td>${i}</td>
                <td>${result.boards[i]}</td>
                <td>${result.scores[i]}</td>
                <td>${result.times[i]}</td>
                <td>${result.red.times[i]}</td>
                <td>${result.blue.times[i]}</td>
            </tr>
        `;
    }

    gamesTableHTML += `<tbody>${gamesTableInnerHTML}</tbody>`;
    matchHTML += `<table class="sortable-table">${gamesTableHTML}</table>`;
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
    let teamHTML = `
    <div class="page-title">
        <h2>
            Tournament <a href=#tournament?tournamentID=${tournamentID}>${tournamentID}</a>
            ${teamName} Team States
        </h2>
    </div>
    `;

    teamHTML += `
        <h3>Tournament Stats</h3>
    `;

    for(const [i, record] of result["records"].entries()) {
        if (record["name"] != teamName){
            continue;
        }
        teamHTML += `
            <p><label>Wins:</label><span>${record["wins"]}</span></p>
            <p><label>Losses:</label><span>${record["losses"]}</span></p>
            <p><label>Ties:</label><span>${record["ties"]}</span></p>
        `;
    }

    teamHTML += `
        <h3>Match Stats</h3>
    `;

    let matchesTableHTML = `
        <thead>
            <tr>
                <th></th>
                <th>Match ID</th>
                <th>Red Team</th>
                <th>Blue Team</th>
                <th>Red Wins</th>
                <th>Blue Wins</th>
                <th>Ties</th>
                <th>Stats DL</th>
                <th>Games DL</th>
            </tr>
        </thead>
    `;

    let matchesTableInnerHTML = ``;
    for(const [i, match] of result["matches"].entries()) {
        let redTeamName = match["red"]["name"];
        let blueTeamName = match["blue"]["name"];

        if (redTeamName != teamName &&  blueTeamName != teamName) {
            continue;
        }

        let matchBaseDir = `./tournament/results/${tournamentID}/matches/${tournamentID}_${redTeamName}_vs_${blueTeamName}`;

        matchesTableInnerHTML += `
            <tr>
                <td><a href=#match?tournamentID=${tournamentID}&redTeam=${redTeamName}&blueTeam=${blueTeamName}>View</a></td>
                <td>${i}</td>
                <td>
                    <a href=#team?teamName=${match["red"]["name"]}&tournamentID=${tournamentID}>${match["red"]["name"]}</a>
                </td>
                <td>
                    <a href=#team?teamName=${match["blue"]["name"]}&tournamentID=${tournamentID}>${match["blue"]["name"]}</a>
                </td>
                <td>${match["red"]["wins"]}</td>
                <td>${match["blue"]["wins"]}</td>
                <td>${match["red"]["ties"]}</td>
                <td>
                    <a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_matchstats.json" download>Link</a>
                </td>
                <td>
                    <a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}.zip" download>Link</a>
                </td>
            </tr>
        `;
    }

    matchesTableHTML += `<tbody>${matchesTableInnerHTML}</tbody>`;
    teamHTML += `<table class="sortable-table">${matchesTableHTML}</table>`;
    content.innerHTML = teamHTML;
    edq.util.table.enableSortingAll();
}

document.addEventListener("DOMContentLoaded", main);
