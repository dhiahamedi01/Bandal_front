import React from "react";
import "./Styles/Home.css";
import "../pages/Styles/Home.css";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom";

import videoBackground from "../assets/triple.mp4"; // Replace with your actual video file path

const Home = () => {
  const navigate = useNavigate();

  const discoverMore = () => {
    navigate("/products");
  };

  return (
    <div className="Home-main-component d-flex">
      <video autoPlay loop muted className="video-background video-responsive " >
        <source src={videoBackground} type="video/mp4" />
      </video>
        <div className='discover-more-cta-button'><ButtonComponent  onClick={discoverMore}>Discover more</ButtonComponent></div>
    </div>
  );
};

export default Home;
