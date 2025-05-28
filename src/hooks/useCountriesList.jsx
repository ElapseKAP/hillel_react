import { useEffect, useState } from "react";
import { services } from "services/countriesAPI";

function useCountriesList() {
  const [countries, setCountries] = useState([]);

  const fetchData = async () => {
    try {
      const response = await services.get("all");
      if (response.status === 200) {
        setCountries(response?.data);
      }
    } catch (error) {
      console.error("Error getting countries list: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return countries;
}

export default useCountriesList;
