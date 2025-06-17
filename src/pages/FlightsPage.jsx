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
