import { NavLink } from "react-router";

function CountriesListItem({ classAttr, country }) {
  let classArray = ["list-group-item", "list-group-item-action"];
  if (classAttr === "colored") {
    classArray.push("list-group-item-primary");
  }

  return (
    <li className={classArray.join(" ")}>
      <NavLink to={`/countries/${country.cca3}`} style={{textDecoration: 'none'}}>
        {country.flag} &nbsp;&nbsp;&nbsp;
        {country.name?.official}
      </NavLink>
    </li>
  );
}

export default CountriesListItem;
