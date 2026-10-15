function main() {
    window.addEventListener("hashchange", route);
    route();
}

function route() {
    if (window.location.hash == ""){
        window.location.hash = "#home";
        route();
    }

    if(window.location.hash == "#home"){
        fetchHome();
    }

    if(window.location.hash.slice(1).match(/^\d+$/)){
        let id = window.location.hash.slice(1);
        fetchTournament(id);
    }
}

function fetchHome() {
    fetch("/tournament").then(function(response) {
        response.text().then(renderHome)
    });
}

function renderHome(text) {
    let content = document.querySelector(".content");

    let element = document.createElement("div");
    element.innerHTML = text;

    homeHTML = `<h1>Capture the Flag Tournament</h1>`;
    for (const link of element.querySelectorAll("li a")) {
        let id = link.getAttribute("href").replace(/\/$/, "");
        if (!id.match(/^\d+$/)) {
            continue;
        }

        homeHTML += `<a href=#${id}>${id}</a><br>`;
    }

    content.innerHTML = homeHTML;
}

function fetchTournament(id) {
    fetch(`/tournament/${id}/results.json`).then(function(response) {
        response.json().then(function(result) {
            renderTournament(id, result);
        });
    });
}

function renderTournament(id, data) {
    let content = document.querySelector(".content");

    let tournamentHTML = `
        <h1>Capture the Flag Tournament ${id}</h1>
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
        matchesTableHTML += `
            <tr>
                <td><a href="">View</a></td>
                <td>${i}</td>
                <td>${match["red"]["name"]}</td>
                <td>${match["blue"]["name"]}</td>
                <td>${match["red"]["wins"]}</td>
                <td>${match["blue"]["wins"]}</td>
                <td>${match["blue"]["ties"]}</td>
                <td>${match["blue"]["ties"]}</td>
                <td>
                    <a href="/tournament/${id}/matches/${id}_${match["red"]["name"]}_vs_${match["blue"]["name"]}/${id}_${match["red"]["name"]}_vs_${match["blue"]["name"]}_matchstats.json" download>Link</a>
                </td>
                <td>
                    <a href="/tournament/${id}/matches/${id}_${match["red"]["name"]}_vs_${match["blue"]["name"]}/${id}_${match["red"]["name"]}_vs_${match["blue"]["name"]}.zip" download>Link</a>
                </td>
            </tr>
        `;
    }

    tournamentHTML += `<table>${matchesTableHTML}</table>`;
    content.innerHTML = tournamentHTML;
}

document.addEventListener("DOMContentLoaded", main);
