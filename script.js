const API_KEY = "bb3b262f88f67987671b143788f6df43";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;

const main = document.getElementById("main");
const backdrop = document.getElementById("backdrop");
const span = document.getElementById("span");
const form = document.querySelector("form");
const input = document.querySelector("input");
const cross = document.querySelector(".cross");
const navbar = document.querySelector(".navbar");
const rightArrow = document.querySelector(".right-arrow");
const leftArrow = document.querySelector(".left-arrow");
let index = 1;

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  backdropImages(data.results, index);
  showMovies(data.results);
}

async function searchMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

// Showing movies to the UI
function showMovies(moviesData) {
  main.innerHTML = "";
  moviesData.forEach((movie) => {
    const {
      original_title,
      overview,
      poster_path,
      vote_average,
      backdrop_path,
    } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie-container");

    movieEl.innerHTML = `
        <div id="movie" class="movie">
            <img src="${IMG_PATH + poster_path}" alt="">
            <div class="name-rating">
                <h1>${original_title}</h1>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
        </div>
        <div class="overview">
            <h1>Overview</h1>
            ${overview}
        </div>
        `;

    main.appendChild(movieEl);
  });
}

function backdropImages(moviesData, i) {
  moviesData.forEach((movie) => {
    const { backdrop_path } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add(`backdrop-container-${i}`);

    movieEl.innerHTML = `
        <div id="backdrop-image" class="movie">
        <img src="${IMG_PATH + backdrop_path}" alt="">
        </div>
        `;

    showbackdrop(i, movieEl);
    i++;
  });
}

function showbackdrop(index, movieEl) {
  backdrop.classList.contains(`backdrop-container-${index}`);
  backdrop.appendChild(movieEl);
}

function getColor(vote) {
  if (vote > 8) {
    return "green";
  } else if (vote > 5) {
    return "blue";
  } else {
    return "red";
  }
}

// form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(SEARCHAPI + input.value);
  searchMovies(SEARCHAPI + input.value);
});

// Navbar
cross.addEventListener("click", function () {
  navbar.classList.toggle("hidden");
});
