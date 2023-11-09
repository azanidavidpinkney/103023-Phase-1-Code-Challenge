document.addEventListener('DOMContentLoaded', () => {
    getAllFilms();
});

const filmsAPI = 'http://localhost:3000/films';
let filmList = [];

const filmMenu = document.getElementById('films');
const buyButton = document.getElementById('buy-ticket');


function getAllFilms() {
    fetch(filmsAPI)
    .then(response => response.json())
    .then(films => {
        filmList = films;
        renderFilms(films)
        getFilmDetails(films[0].id);
    });
};

function renderFilms(films) {
    filmMenu.innerHTML = ` `;
    films.forEach(renderFilm);
};

function renderFilm(film) {
    const li = document.createElement('li')
    li.textContent = film.title;
    li.addEventListener('click', () => getFilmDetails(film.id));
    filmMenu.appendChild(li);
};

getAllFilms();

function getFilmDetails(id) {
    fetch(`${filmsAPI}/${id}`)
    .then(response => response.json())
    .then(film => displayFilmDetails(film));
};

let currentFilm = null;

function displayFilmDetails(film) {
    currentFilm = film;
   
    document.getElementById('poster').src = film.poster
    document.getElementById('poster').alt = film.title
    
    document.getElementById('title').textContent = film.title;
    document.getElementById('runtime').textContent = `${film.runtime} minutes`;
    document.getElementById('film-info').textContent = film.description;
    document.getElementById('showtime').textContent = film.showtime;
   
    const remainingTickets = film.capacity - film.tickets_sold;
    document.getElementById('ticket-num').textContent = remainingTickets;
};

buyButton.addEventListener('click', buyTicket);

function buyTicket(e) {
    e.preventDefault();
    const remainingTickets = currentFilm.capacity - currentFilm.tickets_sold
    if (remainingTickets > 0) {
        currentFilm.tickets_sold += 1;
        document.getElementById('ticket-num').textContent = remainingTickets - 1;
    } else {
        alert('Sorry, this showing is sold out! Try checking out another film that may have tickets remaining. Thanks so much! - Flatdango Management');
    }
};
