import React from "react";
import { useNavigate } from "react-router";
import "./FlightList.css";

function FlightList({ flights }) {
  const navigate = useNavigate();

  return (
    <ul className="flights-list">
      {flights.map((flight) => (
        <li key={flight.id} className="flight-item">
          <h3>
            {flight.flightNumber} — {flight.airline}
          </h3>
          <span>
            {flight.origin} → {flight.destination}
          </span>
          <span>
            Date: {flight.departureDate} | Departure: {flight.departureTime} | Arrival:{" "}
            {flight.arrivalTime}
          </span>
          <span>
            Price: <strong>{flight.currency}</strong>
            {flight.price} | Seats: {flight.availableSeats}
          </span>
          <button onClick={() => navigate(`/flights/${flight.id}`)}>Book</button>
        </li>
      ))}
    </ul>
  );
}

export default FlightList;
