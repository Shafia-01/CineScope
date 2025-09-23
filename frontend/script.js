const API_KEY = "your_api_key_here"; // Replace with OMDB/TMDB API key
const API_URL = "https://www.omdbapi.com/?apikey=" + API_KEY + "&s=";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieResults = document.getElementById("movieResults");
const movieModal = document.getElementById("movieModal");
const closeModal = document.getElementById("closeModal");
const movieDetails = document.getElementById("movieDetails");
const reviewForm = document.getElementById("reviewForm");
const reviewList = document.getElementById("reviewList");

// LocalStorage Key
const REVIEW_KEY = "movieReviews";

// Search movies
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) fetchMovies(query);
});

async function fetchMovies(query) {
  const res = await fetch(API_URL + query);
  const data = await res.json();
  if (data.Search) displayMovies(data.Search);
  else movieResults.innerHTML = "<p>No results found.</p>";
}

function displayMovies(movies) {
  movieResults.innerHTML = "";
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "assets/placeholder.png"}" alt="${movie.Title}">
      <h3>${movie.Title} (${movie.Year})</h3>
    `;
    card.addEventListener("click", () => openMovieDetails(movie.imdbID));
    movieResults.appendChild(card);
  });
}

async function openMovieDetails(id) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
  const movie = await res.json();

  movieDetails.innerHTML = `
    <h2>${movie.Title} (${movie.Year})</h2>
    <img src="${movie.Poster !== "N/A" ? movie.Poster : "assets/placeholder.png"}" alt="${movie.Title}" style="max-width:200px;">
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Director:</strong> ${movie.Director}</p>
    <p><strong>Actors:</strong> ${movie.Actors}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
  `;

  loadReviews(id);
  movieModal.classList.remove("hidden");

  // Handle review submission
  reviewForm.onsubmit = (e) => {
    e.preventDefault();
    const rating = document.getElementById("rating").value;
    const reviewText = document.getElementById("reviewText").value;
    saveReview(id, rating, reviewText);
    loadReviews(id);
    reviewForm.reset();
  };
}

function saveReview(movieId, rating, reviewText) {
  let reviews = JSON.parse(localStorage.getItem(REVIEW_KEY)) || {};
  if (!reviews[movieId]) reviews[movieId] = [];
  reviews[movieId].push({ rating, reviewText });
  localStorage.setItem(REVIEW_KEY, JSON.stringify(reviews));
}

function loadReviews(movieId) {
  reviewList.innerHTML = "";
  let reviews = JSON.parse(localStorage.getItem(REVIEW_KEY)) || {};
  if (reviews[movieId]) {
    reviews[movieId].forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>⭐ ${r.rating}</strong> - ${r.reviewText}`;
      reviewList.appendChild(li);
    });
  }
}

// Close modal
closeModal.addEventListener("click", () => movieModal.classList.add("hidden"));
