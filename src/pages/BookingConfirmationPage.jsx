import React from "react";
import { useLocation, Link } from "react-router";
import "./BookingConfirmationPage.css";

const BookingConfirmationPage = () => {
  const location = useLocation();
  const { flightNumber, destination } = location.state || {};

  return (
    <div className="booking-confirmation-page">
      <div className="confirmation-card">
        <span className="emoji">🎉✈️</span>
        <h2>Congratulations!</h2>
        <p>
          Your ticket for flight <strong>{flightNumber || "№ ???"}</strong> to{" "}
          <strong>{destination || "unknown"}</strong> has been successfully booked!
        </p>
        <p>We wish you a pleasant flight and unforgettable impressions! 🚀</p>

        <Link to="/flights" className="back-button">
          🔙 Return to flight search
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
