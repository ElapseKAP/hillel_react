import SelectItem from "components/SelectItem/SelectItem";
import CountriesContext from "context/CountriesContext";
import { useContext } from "react";
import { Link } from "react-router";

function SelectField() {
  const { countries, selectedCountry, setSelectedCountry } = useContext(CountriesContext);

  const handleSelectField = (e) => {
    const cca = e.target.value;
    const selected = countries.find((item) => item.cca3 === cca);
    setSelectedCountry(selected);
  };

  return (
    countries && (
      <>
        <div className="countries-feild">
          <select
            id="countries"
            className="countries form-select"
            value={selectedCountry ? selectedCountry.cca3 : ""}
            onChange={handleSelectField}
          >
            <option value="" disabled={true}>
              Choose the country
            </option>
            {countries.map((country) => (
              <SelectItem key={country.cca3} country={country} />
            ))}
          </select>
        </div>
        {selectedCountry && (
          <div className="selected-country">
            <Link to={`/countries/${selectedCountry.cca3}`} className="btn btn-light mt-3">
              Read more about: <span>{selectedCountry.flag}</span> {selectedCountry.name?.official}
            </Link>
          </div>
        )}
      </>
    )
  );
}

export default SelectField;
