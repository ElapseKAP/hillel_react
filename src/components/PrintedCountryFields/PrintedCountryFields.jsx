import { printFields } from "utils/helpers";

function PrintedCountryFields({ country }) {
  return country && <div className="printed-country-fields mt-4">
    <h2 className="my-4 text-info">Data output according to task requirements</h2>
    <div className="data-wrapper bg-light-subtle p-2 border border-danger-subtle rounded-2">
      {printFields(country)}
    </div>
  </div>;
}

export default PrintedCountryFields;
