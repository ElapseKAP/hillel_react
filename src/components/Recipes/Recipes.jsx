import Button from "components/Button/Button";
import Wrapper from "components/Wrapper/Wrapper";

import "./Recipes.css";

function Recipes({ recipeList, onBtnAction }) {
  return (
    recipeList && (
      <div className="recipe-wrapper">
        <ul className="list">
          {recipeList.map((recipe) => (
            <li key={recipe.id} className="list-row">
              <img src={recipe.image} alt={recipe.name} width="100" />
              <h3>{recipe.name}</h3>
              <Wrapper attrs={{ className: "buttons-wrapper" }}>
                <Button
                  attrs={{ className: "btn btn-edit" }}
                  title="Edit Recipe"
                  recipeId={recipe.id}
                  onBtnAction={onBtnAction}
                />
                <Button
                  attrs={{ className: "btn btn-delete" }}
                  title="Delete Recipe"
                  recipeId={recipe.id}
                  onBtnAction={(e) => onBtnAction(e, "delete")}
                />
              </Wrapper>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default Recipes;
