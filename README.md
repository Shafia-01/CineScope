# 🎬 CineScope - Your lens into the world of movies  
A **movie review and rating platform** where users can search movies, view details, add ratings & reviews, and maintain a personal watchlist.  
Built with **HTML, CSS, JavaScript (Frontend)** and a **Node.js/Express proxy backend** for secure OMDB API integration.  

## ✨ Features  
- 🔎 **Search Movies** – Search by title using the OMDB API.  
- 📖 **Movie Details** – View posters, cast, genre, plot, and more.  
- ⭐ **User Reviews & Ratings** – Add star ratings and text reviews (stored in LocalStorage).  
- 📌 **Watchlist** – Save favorite movies to a personal watchlist.  
- 💾 **Local Persistence** – Reviews and watchlist are saved locally and persist across sessions.  
- 📱 **Responsive Design** – Optimized for desktop and mobile devices.  
- 🔐 **Secure API Access** – API key protected through a Node.js backend proxy.   

## 🛠️ Tech Stack  
**Frontend**:  
- HTML5  
- CSS3 (Cinematic red-black-gold theme)  
- Vanilla JavaScript  

**Backend**:  
- Node.js + Express  
- CORS + dotenv  
- OMDB API (via proxy)  

**Storage**:  
- LocalStorage (for reviews & watchlist)  

## 🚀 Getting Started  
### 🔧 Prerequisites  
- [Node.js](https://nodejs.org/) installed  
- OMDB API Key (get it from [OMDB API](https://www.omdbapi.com/))  

### ⚙️ Backend Setup  
```bash
cd backend
npm install
```
Create a `.env` file in `backend/` and add:
```
OMDB_KEY=your_api_key_here
```
Run the backend:
```bash
npm start
```
Backend runs on: http://localhost:3000

## 🎨 Frontend Setup
1. Open the `frontend/` folder in VS Code.
2. Right-click `index.html` → Open with Live Server (or just open in browser).
3. The app runs on: http://127.0.0.1:5500

## 📌 Project Structure
```
cinescope/
│── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
│── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── assets/
    └── placeholder.png
```

## 🌟 Future Enhancements
- 🔑 User authentication (login/signup system).
- ☁️ Cloud database (MongoDB/PostgreSQL) for reviews & watchlist.
- 🎯 Personalized recommendations using AI/ML.