import React from "react";
import { Link, useNavigate } from "react-router";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    token && (
      <header className="header">
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/flights">Flights</Link>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>
    )
  );
};

export default Header;
