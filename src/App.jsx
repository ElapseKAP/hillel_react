import ProductsList from "./components/ProductsList/ProductsList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Title from "./components/Title/Title";


function App() {

  return <div className="container">
    <div className="row">
      <Title tag="p" classAttr="text-center fs-1 text-success">Our products</Title>
    </div>

    <div className="row g-3">
      <ProductsList />
    </div>
  </div>
}

export default App;