import { useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header/Header";
import CountriesContext from "context/CountriesContext";
import useCountriesList from "hooks/useCountriesList";

function Layout() {
  const countries = useCountriesList();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const contextValue = {
    countries,
    selectedCountry,
    setSelectedCountry,
  };

  return (
    <>
      <Header />
      <div className="main-content">
        <div className="container">
          <CountriesContext.Provider value={contextValue}>
            <Outlet />
          </CountriesContext.Provider>
        </div>
      </div>
    </>
  );
}

export default Layout;
