import { createBrowserRouter, RouterProvider } from "react-router";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "pages/Layout";
import ErrorRoute from "routes/ErrorRoute";
import HomeRoute from "routes/HomeRoute";
import CountriesRoute from "routes/CountriesRoute";
import CountryRoute from "routes/CountryRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        Component: HomeRoute,
      },
      {
        path: "countries",
        children: [
          { index: true, Component: CountriesRoute },
          { path: ":id", Component: CountryRoute },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
