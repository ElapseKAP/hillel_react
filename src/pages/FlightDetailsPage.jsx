import React from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetFlightByIdQuery, useUpdateFlightMutation } from "@/api/flightsAPI";

import "./FlightDetailsPage.css";

const schema = z.object({
  fullName: z.string().nonempty("Required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().optional(),
  confirmAgreement: z.boolean().refine((val) => val === true, "Must agree to terms"),
});

const FlightDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: flight, isLoading, isError } = useGetFlightByIdQuery(id);
  const [updateFlight] = useUpdateFlightMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData) => {
    try {
      await updateFlight({
        id,
        updatedData: { availableSeats: flight.availableSeats - 1 },
      }).unwrap();

      navigate("/booking-confirmation", {
        state: {
          flightNumber: flight.flightNumber,
          destination: flight.destination,
        },
      });
    } catch {
      alert("Booking failed. Try again.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching flight details.</p>;

  return (
    <div className="flight-details-page">
      <h2>
        {flight.flightNumber} — {flight.airline}
      </h2>
      <p>
        {flight.origin} → {flight.destination}
      </p>
      <p>
        Departure Date: {flight.departureDate}, Departure: {flight.departureTime}, Arrival:{" "}
        {flight.arrivalTime}
      </p>
      <p>
        Price: <strong>{flight.currency}</strong>
        {flight.price}, Seats: {flight.availableSeats}
      </p>

      <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Full name</label>
          <input {...register("fullName")} />
          {errors.fullName && <p className="error">{errors.fullName.message}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input {...register("email")} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Phone (optional)</label>
          <input {...register("phoneNumber")} />
        </div>
        <div className="form-group checkbox">
          <label>
            <input type="checkbox" {...register("confirmAgreement")} /> I agree to the terms and
            conditions
          </label>
          {errors.confirmAgreement && <p className="error">{errors.confirmAgreement.message}</p>}
        </div>
        <button className="btn btn-booking" type="submit">
          Booking
        </button>
      </form>
    </div>
  );
};

export default FlightDetailsPage;
