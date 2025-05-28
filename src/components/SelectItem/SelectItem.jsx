function SelectItem({ country }) {
  return (
    <option value={country.cca3}>
      {country.flag} &nbsp;&nbsp;&nbsp;{country.name?.official}
    </option>
  );
}

export default SelectItem;
