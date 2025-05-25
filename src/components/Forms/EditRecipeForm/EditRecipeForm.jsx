import { useState } from "react";
import { services } from "services/recipesAPI";
import "../Forms.css";

function EditRecipeForm({ entity, onSubmitEditForm, onEditForm}) {
  const [formData, setFormData] = useState(entity);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditForm = async (e) => {
    e.preventDefault();
    await services.put(`recipes/${formData.id}`, formData);
    onSubmitEditForm(false);
    onEditForm();

  };

  return (
    <form className="edit-recipe-form" id="create-recipe" onSubmit={handleEditForm}>
      <div className="recipe-image-field text-field">
        <label htmlFor="recipe-img">Recipe Image</label>
        <input
          type="text"
          className="recipe-image"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
        />
      </div>

      <div className="recipe-name-field text-field">
        <label htmlFor="">Recipe name</label>
        <input
          type="text"
          className="recipe-name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="grouped-field">
        <div className="calories-field number-field">
          <label htmlFor="recipe-calories">Calories</label>
          <input
            id="recipe-calories"
            type="number"
            step="10"
            min="10"
            name="caloriesPerServing"
            className="serving-calories"
            value={formData.caloriesPerServing}
            onChange={handleInputChange}
          />
        </div>

        <div className="calories-field number-field">
          <label htmlFor="recipe-cooktime">Cook time</label>
          <input
            id="cooktime"
            type="number"
            step="5"
            min="5"
            name="cookTimeMinutes"
            className="cooktime"
            value={formData.cookTimeMinutes}
            onChange={handleInputChange}
          />
        </div>

        <div className="rating-field number-field">
          <label htmlFor="recipe-rating">Rating</label>
          <input
            id="recipe-rating"
            type="number"
            step=".01"
            min="0"
            max="5"
            name="rating"
            className="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="btn-wrap">
        <button type="submit">Save Recipe</button>
        <button onClick={() => onSubmitEditForm(false)}>Close</button>
      </div>
    </form>
  );
}

export default EditRecipeForm;
