function FlightSearchForm({ onSearch, register, errors, resetSearch }) {
  return (
    <form className="search-form" onSubmit={onSearch}>
      <div className="form-group">
        <label>Departure place:</label>
        <input {...register("origin")} />
        {errors.origin && <p className="error">{errors.origin.message}</p>}
      </div>

      <div className="form-group">
        <label>Arrival place:</label>
        <input {...register("destination")} />
        {errors.destination && <p className="error">{errors.destination.message}</p>}
      </div>

      <div className="form-group">
        <label>Departure Date:</label>
        <input type="date" {...register("departureDate")} />
        {errors.departureDate && <p className="error">{errors.departureDate.message}</p>}
      </div>

      <button type="submit">Search</button>
      {resetSearch && (
        <button type="button" onClick={resetSearch} className="reset-button">
          Show all
        </button>
      )}
    </form>
  );
}

export default FlightSearchForm;
