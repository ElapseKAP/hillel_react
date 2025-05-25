import { useForm } from "react-hook-form";
import { services } from "services/recipesAPI";

function CreateRecipeForm({ onClickClose, onCreateForm }) {
  const { register, handleSubmit } = useForm();

  const handleClickClose = () => {
    onClickClose(false);
  };

  const handleCreateRecipe = async (data) => {
    console.log(data);
    try {
      await services.post("recipes", data);
      onClickClose(false);
      onCreateForm();
    } catch (error) {
      throw error;
    }
  };

  return (
    <form
      className="create-recipe-form"
      id="create-recipe"
      onSubmit={handleSubmit(handleCreateRecipe)}
    >
      <div className="recipe-image-field required">
        <label htmlFor="recipe-img">Recipe Image</label>
        <input type="text" className="recipe-image" {...register("image", { require: true })} />
      </div>

      <div className="recipe-name-field required">
        <label htmlFor="">Recipe name</label>
        <input type="text" className="recipe-name" {...register("name", { require: true })} />
      </div>

      <div className="cuisine-field required">
        <label htmlFor="">Cuisine</label>
        <input type="text" className="cuisine" {...register("cuisine", { require: true })} />
      </div>

      <div className="ingredients-field required">
        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          id="ingredients"
          className="ingredients"
          rows="4"
          {...register("ingredients", { require: true })}
        ></textarea>
      </div>

      <div className="instructions-field required">
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          className="instructions"
          rows="4"
          {...register("instructions", { require: true })}
        ></textarea>
      </div>

      <div className="grouped-field">
        <div className="calories-field">
          <label htmlFor="recipe-calories">Calories</label>
          <input
            id="recipe-calories"
            type="number"
            step="10"
            min="10"
            className="serving-calories"
            {...register("caloriesPerServing")}
          />
        </div>

        <div className="calories-field">
          <label htmlFor="recipe-cooktime">Cook time</label>
          <input
            id="cooktime"
            className="cooktime"
            type="number"
            step="5"
            min="5"
            {...register("cookTimeMinutes")}
          />
        </div>

        <div className="rating-field">
          <label htmlFor="recipe-rating">Rating</label>
          <input
            id="recipe-rating"
            className="rating"
            type="number"
            step=".01"
            min="0"
            max="5"
            {...register("rating")}
          />
        </div>
      </div>

      <div className="btn-wrap">
        <button type="submit">Create Recipe</button>
        <button onClick={handleClickClose}>Close</button>
      </div>
    </form>
  );
}

export default CreateRecipeForm;
