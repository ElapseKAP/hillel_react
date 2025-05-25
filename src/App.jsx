import { useState, useEffect, useRef } from "react";
import Recipes from "./components/Recipes/Recipes";
import Modal from "components/Modal/Modal";
import CreateRecipeForm from "components/Forms/CreateRecipeForm/CreateRecipeForm";
import EditRecipeForm from "components/Forms/EditRecipeForm/EditRecipeForm";
import Wrapper from "components/Wrapper/Wrapper";
import Button from "components/Button/Button";

import { services } from "services/recipesAPI";
import { sortList } from "utils/helpers";

import "./App.css";
import Toolbar from "components/Toolbar/Toolbar";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(null);
  const [form, setForm] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletedRecipe, setDeletedRecipe] = useState(null);
  const [filter, setFilter] = useState("");

  const initialList = useRef([]);
  const fetchData = async (entityName = "recipes", filter = {}) => {
    const data = await services.get(entityName, filter);
    setRecipes(data);
    initialList.current = data;
  };

  const handleBtnAction = async (e, type = "edit") => {
    const recipeId = e.target.getAttribute("data-recipe-id");

    if (type === "edit") {
      const recipe = recipes.find((item) => item.id === recipeId);
      setEditedRecipe(recipe);
    } else if (type === "delete") {
      setConfirmDelete(true);
      setDeletedRecipe(recipeId);
      return;
    } else if (type === "confirm-delete") {
      const response = await services.delete("recipes", recipeId);
      if (response?.statusText === "OK") {
        fetchData();
      }
      setConfirmDelete(false);
      return;
    }
    setForm(type);
    setShowForm(true);
  };

  const handleSubmitFilter = (e) => {
    e.preventDefault();
    fetchData("recipes", { cuisine: filter });
  };

  const handleSortField = (e) => {
    const criterion = e.target.value;
    let sortedList = criterion === "" ? [...initialList.current] : sortList(recipes, criterion);
    setRecipes(sortedList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Toolbar
        onSubmitFilter={handleSubmitFilter}
        onChangeFilter={setFilter}
        filterState={filter}
        onBtnCreateForm={handleBtnAction}
        onChangeSortField={handleSortField}
      />

      <Recipes recipeList={recipes} onBtnAction={handleBtnAction} />

      {showForm && (
        <Modal title={(form === "edit" ? "Edit" : "Create") + " Recipe Form"}>
          {form === "edit" ? (
            <EditRecipeForm
              entity={editedRecipe}
              onSubmitEditForm={setShowForm}
              onEditForm={fetchData}
            />
          ) : (
            <CreateRecipeForm onClickClose={setShowForm} onCreateForm={fetchData} />
          )}
        </Modal>
      )}

      {confirmDelete && (
        <Modal title="Delete recipe">
          <Wrapper attrs={{ className: "confirm-delete-modal buttons-wrapper" }}>
            <Button
              attrs={{ className: "btn-delete" }}
              title="Delete Recipe"
              recipeId={deletedRecipe}
              onBtnAction={(e) => handleBtnAction(e, "confirm-delete")}
            />
            <Button
              attrs={{ className: "btn-cancel" }}
              title="Cancel"
              recipeId={deletedRecipe}
              onBtnAction={() => setConfirmDelete(false)}
            />
          </Wrapper>
        </Modal>
      )}
    </>
  );
}
