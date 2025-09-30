const API_BASE = "https://cinescope-7k1y.onrender.com";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieResults = document.getElementById("movieResults");
const movieModal = document.getElementById("movieModal");
const closeModal = document.getElementById("closeModal");
const movieDetails = document.getElementById("movieDetails");
const reviewForm = document.getElementById("reviewForm");
const reviewList = document.getElementById("reviewList");
const addToWatchlistBtn = document.getElementById("addToWatchlist");
const watchlistContainer = document.getElementById("watchlist");

const REVIEW_KEY = "movieReviews";
const WATCHLIST_KEY = "movieWatchlist";

// Search
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) fetchMovies(query);
});
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

async function fetchMovies(query) {
  try {
    const res = await fetch(`${API_BASE}/search?q=${query}`);
    const data = await res.json();
    if (data.Search) displayMovies(data.Search);
    else movieResults.innerHTML = "<p>No results found.</p>";
  } catch (err) {
    movieResults.innerHTML = "<p>Error loading movies.</p>";
  }
}

function displayMovies(movies) {
  movieResults.innerHTML = "";
  movies.forEach((movie) => {
    const card = createMovieCard(movie, false);
    movieResults.appendChild(card);
  });
}

// Open details
async function openMovieDetails(id) {
  const res = await fetch(`${API_BASE}/details/${id}`);
  const movie = await res.json();

  movieDetails.innerHTML = `
    <h2>${movie.Title} (${movie.Year})</h2>
    <img src="${movie.Poster !== "N/A" ? movie.Poster : "assets/placeholder.png"}" 
         alt="${movie.Title}" style="max-width:200px;">
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Director:</strong> ${movie.Director}</p>
    <p><strong>Actors:</strong> ${movie.Actors}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
  `;

  // Watchlist button
  addToWatchlistBtn.onclick = () => addToWatchlist(movie);

  loadReviews(id);
  movieModal.classList.remove("hidden");

  reviewForm.onsubmit = (e) => {
    e.preventDefault();
    const rating = document.getElementById("rating").value;
    const reviewText = document.getElementById("reviewText").value;
    saveReview(id, rating, reviewText);
    loadReviews(id);
    reviewForm.reset();
  };
}

// Reviews
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
    reviews[movieId].forEach((r) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>⭐ ${r.rating}</strong> - ${r.reviewText}`;
      reviewList.appendChild(li);
    });
  } else {
    reviewList.innerHTML = "<p>No reviews yet. Be the first!</p>";
  }
}

// Watchlist
function addToWatchlist(movie) {
  let watchlist = JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
  if (!watchlist.find((m) => m.imdbID === movie.imdbID)) {
    watchlist.push(movie);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
    loadWatchlist();
  }
}

function loadWatchlist() {
  watchlistContainer.innerHTML = "";
  let watchlist = JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
  watchlist.forEach((movie) => {
    const card = createMovieCard(movie, true);
    watchlistContainer.appendChild(card);
  });
}

function createMovieCard(movie, isWatchlist) {
  const card = document.createElement("div");
  card.classList.add("movie-card");
  card.innerHTML = `
    <img src="${movie.Poster !== "N/A" ? movie.Poster : "assets/placeholder.png"}" alt="${movie.Title}">
    <h3>${movie.Title} (${movie.Year})</h3>
  `;
  card.addEventListener("click", () => openMovieDetails(movie.imdbID));
  return card;
}

// Close modal
closeModal.addEventListener("click", () => movieModal.classList.add("hidden"));
window.addEventListener("click", (e) => {
  if (e.target === movieModal) movieModal.classList.add("hidden");
});

// Load watchlist on page load
loadWatchlist();
