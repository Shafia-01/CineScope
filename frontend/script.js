const API_BASE = "http://localhost:3000/api";

// Search movies
async function fetchMovies(query) {
  const res = await fetch(`${API_BASE}/search?q=${query}`);
  const data = await res.json();
  if (data.Search) displayMovies(data.Search);
  else movieResults.innerHTML = "<p>No results found.</p>";
}

// Movie details
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
