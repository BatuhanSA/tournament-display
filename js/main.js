function main() {
    window.addEventListener("hashchange", route);
    route();

    // TEST
    fetchHome();
    //fetchTournament("20241118");
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

    // TEST
    console.log(window.location.hash);
    console.log(window.location.hash);
}

function fetchHome() {
    fetch("/tournament").then(function(response) {
        response.text().then(renderHome)
    });
}

function renderHome(text) {
    // TEST
    console.log(text);

    let content = document.querySelector(".content");

    let element = document.createElement("div");
    element.innerHTML = text;

    tournamentsHTML = `<h1>Pacman Tournament!</h1>`
    for (const link of element.querySelectorAll("li a")) {
        let id = link.getAttribute("href").replace(/\/$/, "");
        if (!id.match(/^\d+$/)) {
            continue;
        }

        tournamentsHTML += `<a href=#${id}>${id}</a><br>`;

        // TEST
        console.log(link);
        console.log(link.href);
        console.log(link.getAttribute("href"));
    }
    content.innerHTML = tournamentsHTML;

}

function fetchTournament(id) {
    fetch(`/tournament/${id}/results.json`).then(function(response) {
        response.json().then(function(result) {
            renderTournament(id, result);
        });
    });
}

function renderTournament(id, data) {
    // TEST
    console.log(id, data);

    let content = document.querySelector(".content");

    content.innerHTML = `
        <h2>Tournmant ${id}</h2>
    `;

    let redTeam = data["matches"][0]["red"]["name"];
    let blueTeam = data["matches"][0]["blue"]["name"];

    let gifPath = `/tournament/${id}/matches/${id}_${redTeam}_vs_${blueTeam}/${id}_${redTeam}_vs_${blueTeam}_000.gif`;

    let imageElement = document.createElement("img");
    imageElement.src = gifPath;

    content.appendChild(imageElement);
}

document.addEventListener("DOMContentLoaded", main);
