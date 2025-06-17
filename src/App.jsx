import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import LoginPage from "@/pages/LoginPage";
import FlightsPage from "@/pages/FlightsPage";
import HomePage from "@/pages/HomePage";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import Header from "@/components/Header/Header";
import FlightDetailsPage from "@/pages/FlightDetailsPage";
import BookingConfirmationPage from "@/pages/BookingConfirmationPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/flights"
          element={
            <PrivateRoute>
              <FlightsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/flights/:id"
          element={
            <PrivateRoute>
              <FlightDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/booking-confirmation"
          element={
            <PrivateRoute>
              <BookingConfirmationPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
