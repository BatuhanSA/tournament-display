function main() {
    window.addEventListener("hashchange", route);
    route();
}

function route() {
    let url = URL.parse(window.location.hash.replace(/^#/, ''), 'http://localhost');
    let page = url.pathname.replace(/^\//, '');
    let params = url.searchParams;

    if (page == ""){
        window.location.hash = "#home";
        route();
    }

    if (page == "home"){
        fetchHome();
    }

    if (page == "tournament"){
        fetchTournament(params.get("tournamentID"));
    }

    if (page == "match"){
        fetchMatch(params.get("tournamentID"), params.get("matchID"), params.get("redTeam"), params.get("blueTeam"));
    }

    if (page == "team"){
        fetchTeam(params.get("tournamentID"), params.get("teamName"));
    }
}

function fetchHome() {
    fetch("/tournament/results").then(function(response) {
        response.text().then(renderHome);
    });
}

function renderHome(text) {
    let content = document.querySelector(".content");
    let element = document.createElement("div");
    element.innerHTML = text;

    homeHTML = `<h1>Capture the Flag Tournament</h1>`;
    for (const link of element.querySelectorAll("li a")) {
        let tournamentID = link.getAttribute("href").replace(/\/$/, "");
        if (!tournamentID.match(/^\d+$/)) {
            continue;
        }

        homeHTML += `<a href=#tournament?tournamentID=${tournamentID}>${tournamentID}</a><br>`;
    }

    content.innerHTML = homeHTML;
}

function fetchTournament(tournamentID) {
    fetch(`/tournament/results/${tournamentID}/results.json`).then(function(response) {
        response.json().then(function(result) {
            renderTournament(tournamentID, result);
        });
    });
}

function renderTournament(tournamentID, data) {
    let content = document.querySelector(".content");

    let tournamentHTML = `
        <h1>Capture the Flag Tournament ${tournamentID}</h1>
        <h2>Tournament Rankings</h2>
    `;

    let rankingsTableHTML = `
        <tr>
            <th>Rank</th>
            <th>Team Name</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
        </tr>
    `;

    for(const [i, record] of data["records"].entries()){
        rankingsTableHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>
                   <a href=#team?teamName=${record["name"]}&tournamentID=${tournamentID}>${record["name"]}</a>
                </td>
                <td>${record["wins"]}</td>
                <td>${record["losses"]}</td>
                <td>${record["ties"]}</td>
            </tr>
        `;
    }

    tournamentHTML += `
        <table>${rankingsTableHTML}</table>
        <h2>Match Stats</h2>
    `;

    let matchesTableHTML = `
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
    `;

    for(const [i, match] of data["matches"].entries()){
        let redTeamName = match["red"]["name"];
        let blueTeamName = match["blue"]["name"];
        let matchBaseDir = `/tournament/results/${tournamentID}/matches/${tournamentID}_${redTeamName}_vs_${blueTeamName}`;

        matchesTableHTML += `
            <tr>
                <td><a href=#match?tournamentID=${tournamentID}&matchID=${i}&redTeam=${redTeamName}&blueTeam=${blueTeamName}>View</a></td>
                <td>${i}</td>
                <td>${match["red"]["name"]}</td>
                <td>${match["blue"]["name"]}</td>
                <td>${match["red"]["wins"]}</td>
                <td>${match["blue"]["wins"]}</td>
                <td>${match["blue"]["ties"]}</td>
                <td>${match["blue"]["ties"]}</td>
                <td>
                    <a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_matchstats.json" download>Link</a>
                </td>
                <td>
                    <a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}.zip" download>Link</a>
                </td>
            </tr>
        `;
    }

    tournamentHTML += `<table>${matchesTableHTML}</table>`;
    content.innerHTML = tournamentHTML;
}

function fetchMatch(tournamentID, matchID, redTeam, blueTeam) {
    let matchBaseDir = `/tournament/results/${tournamentID}/matches/${tournamentID}_${redTeam}_vs_${blueTeam}`;
    fetch(`${matchBaseDir}/${tournamentID}_${redTeam}_vs_${blueTeam}_matchstats.json`).then(function(response) {
        response.json().then(function(result) {
            renderMatch(tournamentID, matchID, redTeam, blueTeam, result);
        });
    });
}

function renderMatch(tournamentID, matchID, redTeamName, blueTeamName, result){
    let content = document.querySelector(".content");
    let matchBaseDir = `/tournament/results/${tournamentID}/matches/${tournamentID}_${redTeamName}_vs_${blueTeamName}`;

    let matchHTML = `
        <h1>Capture the Flag Match ${tournamentID}#${matchID}</h1>
        <h2>
            Match Stats
            (<a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}_matchstats.json" download>Download Full Match Stats</a>)
        </h2>
    `;

    let redTeamHTML = `
        <h3>Red Team</h3>
        <p><label>Name:</label><span>${redTeamName}</span></p>
        <p><label>Wins:</label><span>${result["red"]["wins"]}</span></p>
        <p><label>Ties:</label><span>${result["red"]["ties"]}</span></p>
        <p><label>Losses:</label><span>${result["red"]["losses"]}</span></p>
        <p><label>Crashes:</label><span>${result["red"]["crashes"]}</span></p>
        <p><label>Timeouts:</label><span>${result["red"]["timeouts"]}</span></p>
    `;

    let blueTeamHTML = `
        <h3>Blue Team</h3>
        <p><label>Name:</label><span>${blueTeamName}</span></p>
        <p><label>Wins:</label><span>${result["blue"]["wins"]}</span></p>
        <p><label>Ties:</label><span>${result["blue"]["ties"]}</span></p>
        <p><label>Losses:</label><span>${result["blue"]["losses"]}</span></p>
        <p><label>Crashes:</label><span>${result["blue"]["crashes"]}</span></p>
        <p><label>Timeouts:</label><span>${result["blue"]["timeouts"]}</span></p>
    `;

    matchHTML += redTeamHTML + blueTeamHTML;
    matchHTML += `
        <h2>
            Games
            (<a href="${matchBaseDir}/${tournamentID}_${redTeamName}_vs_${blueTeamName}.zip" download>Download All Games</a>)
        </h2>
    `;

    let gamesTableHTML = `
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
    `

    for (let i = 0; i < result.boards.length; i++) {
        let paddedID = i.toString().padStart(3, '0');
        gamesTableHTML += `
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

    matchHTML += `<table>${gamesTableHTML}</table>`;
    content.innerHTML = matchHTML;
}

function fetchTeam(tournamentID, teamName) {
    fetch(`/tournament/results/${tournamentID}/results.json`).then(function(response) {
        response.json().then(function(result) {
            renderTeam(tournamentID, teamName, result);
        });
    });
}

function renderTeam(tournamentID, teamName, result){
    let content = document.querySelector(".content");
    let teamHTML = `
        <h1>Capture the Flag Tournament 20260521</h1>
        <h2>Team ${teamName}</h2>
    `;
    content.innerHTML = teamHTML;
}

document.addEventListener("DOMContentLoaded", main);
