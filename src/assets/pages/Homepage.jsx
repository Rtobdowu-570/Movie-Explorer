import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Vidsection from "../components/Vidsection";
import Footer from "../components/Footer";
import { useState, useEffect } from 'react';


const Homepage = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      };

      try {
        const res = await fetch("https://api.themoviedb.org/3/trending/movie/day", options);
        const data = await res.json();
        
        const randomIdx = Math.floor(Math.random() * data.results.length);
        setFeaturedMovie(data.results[randomIdx]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrending();
  }, []);

  return (
    <>
      <div
        className="header-background"
        style={{ backgroundImage: `url(${featuredMovie ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}` : ''})` }}
      >
        <Navbar />
        <Hero movie={featuredMovie} />
      </div>
      <Vidsection />
      <Footer />
    </>
  );
};

export default Homepage;
