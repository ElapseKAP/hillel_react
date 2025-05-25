function Toolbar({
  onSubmitFilter,
  onChangeFilter,
  filterState,
  onBtnCreateForm,
  onChangeSortField,
}) {
  return (
    <div className="toolbar">
      <div className="filter-wrap">
        <form onSubmit={onSubmitFilter}>
          <div className="filter-field">
            <label htmlFor="filter-name">Filter recipes by cuisine</label>
            <input
              type="text"
              id="filter-name"
              name="filter_cuisine"
              value={filterState}
              onChange={(e) => onChangeFilter(e.target.value)}
            />
          </div>
          <div className="btn-wrapper">
            <button type="submit">Filter</button>
          </div>
        </form>
      </div>

      <button className="btn btn-create" onClick={(e) => onBtnCreateForm(e, "create")}>
        Create recipe
      </button>

      <div className="sort-field">
        <p>Sort recipes by: </p>
        <select name="sort-recipe" id="sort-recipe" onChange={onChangeSortField}>
          <option value="">Default</option>
          <option value="rating">Rating</option>
          <option value="cookTimeMinutes">Cook time</option>
          <option value="caloriesPerServing">Calories</option>
          <option value="name">Name</option>
          <option value="cuisine">Cuisine</option>
        </select>
      </div>
    </div>
  );
}

export default Toolbar;
