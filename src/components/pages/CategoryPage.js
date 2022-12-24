import MainNavbar from "../MainNavbar";
import RecipeTile from "../RecipeTile";
import { Spinner } from "react-bootstrap";

import { useEffect, useState } from "react";
import axios from "axios";

import "../../css/category-page-styles.css";
import { Link, useParams } from "react-router-dom";

const CategoryPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams()

  let idToTitle = id;
  idToTitle = idToTitle.replace(/\w+/g,
  function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();});

  async function fillRecipeList() {
    await axios
      .get("http://localhost:8000/recipes/get_all_recipes")
      .then((res) => {
        const tempRecipeList = []

        res.data.recipes.forEach(element => {
            if(element.category == idToTitle || element.category == id) {
                tempRecipeList.push(element)
            }
        });

        setRecipes(tempRecipeList);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // since all axios calls are done at this point, set isLoading to false
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fillRecipeList();
  }, []);

  if (!isLoading) {
    return (
      <>
        <MainNavbar />
        <h1 className="category-page-header">{idToTitle}</h1>
        {/*Todo: make the span a link*/}
        <p className="category-page-subheader">
          or browse by other{" "}
          <Link to="/categories" className="category-page-subheader-span">categories</Link>
        </p>

        <div className="recipe-tiles">
          {recipes.map((recipe) => (
            <RecipeTile
              title={recipe.recipe_title}
              author={recipe.username}
              image={recipe.image}
              id={recipe.id}
              likes={recipe.likes}
            />
          ))}
        </div>

        {!!recipes && <p className="no-recipes-message">There are no recipes in this category</p>}
      </>
    );
  } else {
    return <Spinner id="spinner" animation="border" variant="success" />;
  }
};

export default CategoryPage;
