import { useContext } from "react";
import { useParams } from "react-router";
import CountriesContext from "context/CountriesContext";
import { Link } from "react-router";
import CustomLink from "components/CustomLink/CustomLink";
import "./CountrySingle.css";
import PrintedCountryFields from "components/PrintedCountryFields/PrintedCountryFields";

function CountrySingle() {
  const { countries } = useContext(CountriesContext);

  let country = {};
  const params = useParams();
  if (Object.keys(params).length) {
    country = countries.find((item) => item.cca3 === params.id);
  }

  return (
    country && (
      <>
        <div className="card border-primary mb-6" style={{ maxWidth: "30rem" }}>
          <div className="card-header">
            <h5 className="card-title" style={{ margin: 0 }}>
              {country?.name.official}
            </h5>
          </div>

          <div className="card-body text-primary">
            <h4 className="card-subtitle mb-2 text-muted">{country?.name.common}</h4>
            <div className="d-flex justify-content-between align-items-center mt-3">
              {country?.flags?.png && (
                <img
                  src={country?.flags.png}
                  alt={`Flag ${country?.name.common}`}
                  style={{ maxHeight: "50px" }}
                />
              )}
              {country?.coatOfArms?.png && (
                <img
                  src={country?.coatOfArms.png}
                  alt={`Герб ${country?.name.common}`}
                  style={{ maxHeight: "50px" }}
                />
              )}
            </div>
            <br />
            {country?.capital && (
              <p className="card-text">
                <strong className="text-primary">Capital:</strong> {country?.capital.join(", ")}
              </p>
            )}
            {country?.region && (
              <p className="card-text">
                <strong className="text-primary">Region:</strong> {country?.region}
              </p>
            )}
            {country?.subregion && (
              <p className="card-text">
                <strong className="text-primary">Subregion:</strong> {country?.subregion}
              </p>
            )}
            {country?.languages && (
              <p className="card-text">
                <strong className="text-primary">Languages:</strong>{" "}
                {Object.values(country.languages).join(", ")}
              </p>
            )}
            {country?.area && (
              <p className="card-text">
                <strong className="text-primary">Area:</strong> {country?.area.toLocaleString()} km²
              </p>
            )}
          </div>
          {country?.maps?.googleMaps && (
            <div className="card-footer bg-transparent border-primary">
              <Link
                to={country?.maps.googleMaps}
                className="btn btn-outline-primary btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                See at Google Maps
              </Link>
              {country?.maps?.openStreetMaps && (
                <Link
                  to={country?.maps.openStreetMaps}
                  className="btn btn-outline-info btn-sm ms-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenStreetMap
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="buttons-wrapper">
          <CustomLink title="Back to Countries List page" path="/countries" />
          <CustomLink title="Back to Home" path="/countries" color="light" />
        </div>

        {country && <PrintedCountryFields country={country} />}
      </>
    )
  );
}

export default CountrySingle;
