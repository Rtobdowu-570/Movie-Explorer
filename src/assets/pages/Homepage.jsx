import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Vidsection from "../components/Vidsection";
import Footer from "../components/Footer";
import "../styles/main.css";
import image from "../images/image.jpg";

const Homepage = () => {
  return (
    <>
      <div
        className="header-background"
        style={{ backgroundImage: `url(${image})` }}
      >
        <Navbar />
        <Hero />
      </div>
      <Vidsection />
      <Footer />
    </>
  );
};

export default Homepage;
