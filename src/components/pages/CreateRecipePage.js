import { useState } from "react";
import { Button } from "react-bootstrap";
import "../../css/create-recipe-page-styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateRecipePage = (props) => {
  const [title, setTitle] = useState("Title");
  const [image, setImage] = useState("Image URL (Must be Square)");
  const [description, setDescription] = useState("Description");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [category, setCategory] = useState("Category/Cuisine");

  let navigate = useNavigate()

  function clearField(fieldValue, fieldFunction) {
    //TODO: Make it so users cannot create an account with fields with "Username", "Email", "Password", and "Confirm Password"

    let isDefaultField = false;

    for (const fieldName of [
      "Title",
      "Category/Cuisine",
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

    const confirm = window.confirm(`Are you sure you want to submit this recipe? (Scroll to view complete summary)\n
    Title: ${title}\n
    Category: ${category}\n
    Description: ${description}\n
    Ingredients: ${ingredients}\n
    Instructions: ${instructions}`);

    if(confirm) {
      let id

      await axios.get(`http://159.65.224.118:8080/members/get_user_by_name/${window.localStorage.getItem('username')}`).then((res) => {
        id = res.data.id
      }).catch((err) => {
        console.log(err)
      })

      if(id != null) {
        const bodyFormData = new FormData()
        bodyFormData.append("recipe_title", title);
        bodyFormData.append("recipe_description", description);
        bodyFormData.append("author", id);
        bodyFormData.append("image", image);
        bodyFormData.append("ingredients", ingredients);
        bodyFormData.append("procedure", instructions);
        // TODO: Create a part in the form for categories
        bodyFormData.append("category", category);

        axios.post("http://159.65.224.118:8080/recipes/create_recipe", bodyFormData).then((res) => {
          console.log("created recipe!")
          navigate("/recipes")
        }).catch((err) => {
          console.log(err)
        })
      } else {
        console.log("it's null")
      }

    }
  }

  function addIngredientOrInstruction(type) {
    const ingredientOrInstruction = prompt(`Enter an ${type}`)

    if(type === "Ingredient") {
      setIngredients(ingredients.concat([ingredientOrInstruction]))
    } else if(type === "Instructions") {
      setInstructions(instructions.concat([ingredientOrInstruction]))
    }
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
                type="text"
                name="Category"
                value={category}
                onChange={({ target }) => setCategory(target.value)}
                onFocus={() => clearField(category, setCategory)}
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
                onClick={() => {addIngredientOrInstruction("Ingredient")}}
              >
                <span className="create-recipe-form-button-text">Add Ingredient</span>
              </Button>

              <Button
                className="custom-button create-recipe-form-button create-recipe-right-most-button"
                id="button"
                variant="outline-success"
                onClick={() => {addIngredientOrInstruction("Instructions")}}
              >
                <span className="create-recipe-form-button-text">Add Instructions</span>
              </Button>

              <Button
                type="submit"
                className="custom-button create-recipe-submit-button"
                id="button"
                variant="outline-success"
              >
                <span className="create-recipe-submit-button-text">Create</span>
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
