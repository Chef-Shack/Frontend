import MainNavbar from "../MainNavbar";
import RecipeTile from "../RecipeTile";

import { useState } from "react";
import axios from "axios";

import "../../css/recipe-page-styles.css"

const RecipesPage = () => { 
    let [recipes, setRecipes] = useState([])
    
    async function fillRecipeList() {
        await axios.get("http://localhost:8000/recipes/get_all_recipes")
        .then((res) => {
            setRecipes(res.data.recipes)
        }).catch((err) => {
            console.log(err)
        })
    }

    fillRecipeList()

    return (
        <>
            <MainNavbar/>
            <h1 className="recipe-page-header">Explore Recipes</h1>
            {/*Todo: make the span a link*/}
            <p className="recipe-page-subheader">or search by <span className="recipe-page-subheader-span">cuisine</span></p>
            
            <div className="recipe-tiles">
                {recipes.map(recipe => <RecipeTile title={recipe.recipe_title} author={recipe.author} image={recipe.image}/>)}
            </div>
                
        </>
    )
}

export default RecipesPage;