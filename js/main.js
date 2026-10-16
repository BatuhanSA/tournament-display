function main() {
    window.addEventListener("hashchange", route);
    route();
}

function route() {
    let url = URL.parse(window.location.hash.replace(/^#/, ''), 'http://localhost');
    let page = url.pathname.slice(1);
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
}

function fetchHome() {
    fetch("/tournament").then(function(response) {
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
    fetch(`/tournament/${tournamentID}/results.json`).then(function(response) {
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

    rankingsTableHTML = `
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
                <td>${record["name"]}</td>
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

    matchesTableHTML = `
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
        let matchBaseDir = `/tournament/${tournamentID}/matches/${tournamentID}_${redTeamName}_vs_${blueTeamName}`;

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
    let matchBaseDir = `/tournament/${tournamentID}/matches/${tournamentID}_${redTeam}_vs_${blueTeam}`;
    fetch(`${matchBaseDir}/${tournamentID}_${redTeam}_vs_${blueTeam}_matchstats.json`).then(function(response) {
        response.json().then(function(result) {
            renderMatch(tournamentID, matchID, redTeam, blueTeam, result);
        });
    });
}

function renderMatch(tournamentID, matchID, redTeam, blueTeam, result){
    let content = document.querySelector(".content");
    matchHTML = `<h1>Capture the Flag Match ${tournamentID}#${matchID}</h1>`;
    content.innerHTML = matchHTML;
}

document.addEventListener("DOMContentLoaded", main);
