# MovieHook 🎬

MovieHook is a modern, responsive web application meant for exploring movies and TV shows. Built with **React** and **Vite**, it leverages the **TMDB (The Movie Database) API** to provide real-time data on trending, popular, and upcoming entertainment.

## 🚀 Features

### 🏠 Homepage
- **Dynamic Hero Section**: Features a random trending movie with high-quality backdrop, title, and overview.
- **Trending & Popular**: Horizontal scrollable lists showing the latest hits.
- **Upcoming Releases**: Stay updated with what's coming next to theaters.
- **TV Shows**: Explore popular television series.

### 🎥 Movie Details
- **Rich Info**: Comprehensive details including cast, crew, runtime, budget, and revenue.
- **Trailers & Videos**: Watch trailers and related videos directly within the app.
- **Reviews**: Read user reviews and ratings.
- **Cast & Crew**: interactive list of valid cast members and production crew.
- **Stats**: View release dates, certification, and technical details.

### 🔍 Search
- **Instant Search**: Find movies by title using the search bar.
- **Results Page**: Grid view of search results with quick access to details.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: Custom CSS (Responsive Design)
- **API**: [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api)
- **Icons**: React Icons
- **Notifications**: React Toastify

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/movie-hook.git
    cd movie-hook
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory and add your TMDB API key:
    ```env
    VITE_TMDB_API_KEY=your_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

## 🔮 Future Improvements

Here are some features planned for future updates:

- [ ] **User Authentication**: Sign up and login to save preferences.
- [ ] **Watchlist & Favorites**: Ability to save movies to a personal list (currently UI only).
- [ ] **TV Show Details**: Dedicated details page for TV series (currently shares structure or redirects).
- [ ] **Advanced Filtering**: Filter by genre, year, and rating.
- [ ] **Pagination**: Load more results for trending and popular lists.
- [ ] **Dark/Light Theme**: User-toggleable themes.
- [ ] **Person Details**: Click on a cast member to see their biography and filmography.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
