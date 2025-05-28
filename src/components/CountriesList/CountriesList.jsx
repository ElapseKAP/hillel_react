import { useContext } from "react";
import CountriesContext from "context/CountriesContext";
import CountriesListItem from "components/CountriesListItem/CountriesListItem";

function ContriesList() {
  const { countries } = useContext(CountriesContext);

  console.log("Countries list component: ", countries);

  return (
    countries && (
      <div className="countries-section">
        <ul className="countries-list list-group">
          {countries.map((country, index) => (
            <CountriesListItem
              classAttr={index % 2 ? "" : "colored"}
              key={country.cca3}
              country={country}
            />
          ))}
        </ul>
      </div>
    )
  );
}

export default ContriesList;
