// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useGetFlightsQuery, useGetAllFlightsQuery } from "@/api/flightsAPI";

// import FlightSearchForm from "@/components/FlightSearchForm";
// import FlightList from "@/components/FlightList";
// import NoFlightsFound from "@/components/NoFlightsFound";
// import LoadingSpinner from "@/components/LoadingSpinner";

// import "./FlightsPage.css";

// const schema = z.object({
//   origin: z.string().nonempty("Required"),
//   destination: z.string().nonempty("Required"),
//   departureDate: z.string().nonempty("Required"),
// });

// const FlightsPage = () => {
//   const [searchParams, setSearchParams] = React.useState(null);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = (data) => {
//     setSearchParams(data);
//   };

//   const {
//     data: foundFlights,
//     isLoading,
//     isError,
//   } = useGetFlightsQuery(searchParams, {
//     skip: !searchParams,
//   });

//   const {
//     data: allFlights,
//     isLoading: isAllLoading,
//     isError: isAllError,
//   } = useGetAllFlightsQuery(undefined, {
//     skip: !!searchParams,
//   });

//   const displayFlights = searchParams ? foundFlights : allFlights;

//   return (
//     <div className="flights-page">
//       <h2>Пошук Рейсів</h2>

//       <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
//         <div className="form-group">
//           <label>Місто відправлення</label>
//           <input {...register("origin")} />
//           {errors.origin && <p className="error">{errors.origin.message}</p>}
//         </div>

//         <div className="form-group">
//           <label>Місто прибуття</label>
//           <input {...register("destination")} />
//           {errors.destination && <p className="error">{errors.destination.message}</p>}
//         </div>

//         <div className="form-group">
//           <label>Дата відправлення</label>
//           <input type="date" {...register("departureDate")} />
//           {errors.departureDate && <p className="error">{errors.departureDate.message}</p>}
//         </div>

//         <button type="submit">Шукати</button>
//         <button
//           type="button"
//           onClick={() => {
//             reset();
//             setSearchParams(null);
//           }}
//           className="reset-button"
//         >
//           Показати всі
//         </button>
//       </form>

//       {(isLoading || isAllLoading) && <p>Loading flights...</p>}
//       {(isError || isAllError) && <p>Failed to fetch flights</p>}

//       {displayFlights && (
//         <ul className="flights-list">
//           {displayFlights.map((flight) => (
//             <li key={flight.id} className="flight-item">
//               <h3>
//                 {flight.flightNumber} — {flight.airline}
//               </h3>
//               <span>
//                 {flight.origin} → {flight.destination}
//               </span>
//               <span>
//                 Дата: {flight.departureDate} | Виліт: {flight.departureTime} | Приліт:{" "}
//                 {flight.arrivalTime}
//               </span>
//               <span>
//                 Ціна: ${flight.price} | Місць: {flight.availableSeats}
//               </span>
//               <button onClick={() => (window.location.href = `/flights/${flight.id}`)}>
//                 Забронювати
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default FlightsPage;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetFlightsQuery, useGetAllFlightsQuery } from "@/api/flightsAPI";
import FlightSearchForm from "@/components/FlightSearchForm/FlightSearchForm";
import FlightList from "@/components/FlightList/FlightList";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import NoFlightsFound from "@/components/NoFlightsFound/NoFlightsFound";
import "./FlightsPage.css";

const schema = z.object({
  origin: z.string().nonempty("Required"),
  destination: z.string().nonempty("Required"),
  departureDate: z.string().nonempty("Required"),
});

const FlightsPage = () => {
  const [searchParams, setSearchParams] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    setSearchParams(data);
  };

  const {
    data: foundFlights,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetFlightsQuery(searchParams, {
    skip: !searchParams,
  });

  const {
    data: allFlights,
    isLoading: isAllLoading,
    isFetching: isAllFetching,
    isError: isAllError,
  } = useGetAllFlightsQuery(undefined, {
    skip: !!searchParams,
  });

  const displayFlights = searchParams ? foundFlights : allFlights;

  return (
    <div className="flights-page">
      <h2>Flights Search</h2>

      <FlightSearchForm
        onSearch={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        resetSearch={
          searchParams
            ? () => {
                reset();
                setSearchParams(null);
              }
            : null
        }
      />

      {(isLoading || isFetching || isAllLoading || isAllFetching) && <LoadingSpinner />}
      {isError && error?.status !== 404 && <p>Error loading flights. Please try again later.</p>}

      {searchParams && isError && error?.status === 404 && (
        <NoFlightsFound
          onReset={() => {
            reset();
            setSearchParams(null);
          }}
        />
      )}

      {displayFlights && displayFlights.length > 0 && <FlightList flights={displayFlights} />}
    </div>
  );
};

export default FlightsPage;
