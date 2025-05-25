import "./Button.css";

function Button({ title, attrs, recipeId, onBtnAction }) {
  return (
    <button {...attrs} data-recipe-id={recipeId} onClick={onBtnAction}>
      {title}
    </button>
  );
}

export default Button;
