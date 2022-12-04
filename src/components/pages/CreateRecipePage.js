import { useState } from "react";
import { Button } from "react-bootstrap";
import "../../css/create-recipe-page-styles.css";
import axios from "axios";

const CreateRecipePage = (props) => {
  const [title, setTitle] = useState("Title");
  const [image, setImage] = useState("Image URL (Must be Square)");
  const [description, setDescription] = useState("Description");
  const [ingredients, setIngredients] = useState([]);
  const [procedure, setProcedure] = useState([]);

  function clearField(fieldValue, fieldFunction) {
    //TODO: Make it so users cannot create an account with fields with "Username", "Email", "Password", and "Confirm Password"

    let isDefaultField = false;

    for (const fieldName of [
      "Title",
      "Image URL (Must be Square)",
      "Description",
    ]) {
      if (fieldValue === fieldName) {
        isDefaultField = true;
      }
    }

    if (isDefaultField) {
      fieldFunction("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
  }

  if (window.localStorage.getItem("authenticated")) {
    return (
      <>
        <div className="create-recipe-body-content">
          <div className="create-recipe-form-container">
            <form className="create-recipe-form" onSubmit={handleSubmit}>
              <h1 id="create-recipe-header">Create Recipe</h1>
              <input
                className="create-recipe-input"
                type="text"
                name="Title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                onFocus={() => clearField(title, setTitle)}
              ></input>

            <input
                className="create-recipe-input"
                type="url"
                name="Image"
                value={image}
                onChange={({ target }) => setImage(target.value)}
                onFocus={() => clearField(image, setImage)}
              ></input>

            <textarea
                name="Description"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
                onFocus={() => clearField(description, setDescription)}
              ></textarea>

              <Button
                className="custom-button create-recipe-form-button"
                id="button"
                variant="outline-success"
              >
                <span className="create-recipe-form-button-text">Add Ingredients</span>
              </Button>

              <Button
                className="custom-button create-recipe-form-button"
                id="button"
                variant="outline-success"
              >
                <span className="create-recipe-form-button-text">Add Instructions</span>
              </Button>

              <Button
                type="submit"
                className="custom-button create-recipe-submit-button"
                id="button"
                variant="outline-success"
              >
                <span className="create-recipe-submit-button-text">Create Recipe</span>
              </Button>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return <h1>Must be logged in to create a recipe</h1>;
  }
};

export default CreateRecipePage;
