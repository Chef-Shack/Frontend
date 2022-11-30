import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainNavbar from "../MainNavbar";

import starOutline from "../../images/star-outline.png";
import starFilled from "../../images/star-filled.png";

import "../../css/individual-recipe-page-styles.css";

const RecipePage = () => {
  const [title, setTitle] = useState("Invalid Recipe");
  const [author, setAuthor] = useState("Invalid User");
  const [image, setImage] = useState("Invalid Image");
  const [pubDate, setPubDate] = useState("Invalid Date");
  const [description, setDescription] = useState("Invalid Description");
  const [ingredients, setIngredients] = useState(["Invalid Ingredients"]);
  const [procedure, setProcedure] = useState(["Invalid Procedure"]);

  const [starImage, setStarImage] = useState(false);

  let { id } = useParams();

  function getCleanDate(date) {
    const monthNames = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    const monthName = monthNames[month - 1];

    return `${monthName} ${day}, ${year}`;
  }

  function likeButtonHandler() {
    if (!starImage) {
      if (window.localStorage.getItem("authenticated")) {
        setStarImage(true);

        console.log(
          `Username on recipe page is: ${window.localStorage.getItem(
            "username"
          )}`
        );

        const bodyFormData = new FormData();
        //TODO: make a check to see if the user is logged in
        bodyFormData.append(
          "username",
          window.localStorage.getItem("username")
        );

        bodyFormData.append("recipeID", id);

        axios
          .post("http://localhost:8000/members/like_recipe", bodyFormData)
          .catch((err) => {
            console.log(err);
          });
      }

      //TODO: set a condition for if the user is not authenticated
    } else {
      if (window.localStorage.getItem("authenticated")) {
        setStarImage(false);

        const bodyFormData = new FormData();

        bodyFormData.append(
          "username",
          window.localStorage.getItem("username")
        );
        bodyFormData.append("recipeID", id);

        axios
          .post("http://localhost:8000/members/unlike_recipe", bodyFormData)
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  useEffect(() => {
    function getRecipe() {
      const bodyFormData = new FormData();
      bodyFormData.append("id", id);

      axios
        .post("http://localhost:8000/recipes/get_recipe", bodyFormData)
        .then((res) => {
          setTitle(res.data.recipe_title);
          setAuthor(res.data.author);
          setImage(res.data.image);
          setPubDate(res.data.pub_date);
          setDescription(res.data.recipe_description);
          setIngredients(res.data.ingredients);
          setProcedure(res.data.procedure);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function checkIfRecipeIsLiked() {
      if (!window.localStorage.getItem("authenticated")) {
        return;
      }

      const username = window.localStorage.getItem("username");

      axios.get(`http://localhost:8000/members/get_user_by_name/${username}`).then((res) => {
        for (const recipeId of res.data.likedRecipes) {
          if(recipeId == id) {
            // fill in the like button if the recipe is already liked
            setStarImage(true)
            console.log("recipe id matches")
          }
        }
      })
    }

    getRecipe();
    checkIfRecipeIsLiked()
  }, []);

  return (
    <>
      <MainNavbar />

      <div className="recipe-page-content">
        <h1 className="recipe-page-title">{title}</h1>
        <p>by {author.toUpperCase()}</p>

        <div className="recipe-page-like-section">
          <p className="recipe-page-like-text">Liked this recipe?</p>
          <button
            className="recipe-page-like-button"
            onClick={() => {
              likeButtonHandler();
            }}
          >
            <img
              className="recipe-page-like-image"
              src={!starImage ? starOutline : starFilled}
              alt="star"
              height={32}
              width={32}
            ></img>
          </button>
        </div>

        <p className="recipe-page-date">{getCleanDate(pubDate)}</p>

        <img
          className="recipe-page-image"
          src={image}
          alt={title}
          height={512}
          width={512}
        ></img>

        <div className="recipe-page-desc-container">
          <p className="recipe-page-desc">{description}</p>
        </div>

        <div className="recipe-page-section">
          <h2>Ingredients</h2>
          <ol>
            {ingredients.map((x) => (
              <li>{x}</li>
            ))}
          </ol>
        </div>

        <div className="recipe-page-section">
          <h2>Instructions</h2>
          <ol>
            {procedure.map((x) => (
              <li>{x}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default RecipePage;
