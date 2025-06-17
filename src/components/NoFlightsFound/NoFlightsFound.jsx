import React from "react";
import "./NoFlightsFound.css";

const NoFlightsFound = ({ onReset }) => (
  <div className="no-flights">
    <p>✈️ Oops! No flights were found according to your search.</p>
    <p>Perhaps try other destinations or dates.</p>
    <button type="button" onClick={onReset} className="reset-button">
      🔄 Show all available flights
    </button>
  </div>
);

export default NoFlightsFound;
