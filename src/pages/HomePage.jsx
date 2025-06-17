import React from "react";
import { Link } from "react-router";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <div className="welcome-card">
        <span className="emoji">✈️🌍</span>
        <h1>Welcome to FlyBook!</h1>
        <p>Search for the best flights, book tickets and discover the world with us.</p>
        <Link to="/flights" className="start-button">
          🔍 Find a flight
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
