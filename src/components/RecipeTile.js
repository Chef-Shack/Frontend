import "../css/recipe-tile-styles.css";
import { Link } from "react-router-dom";
import starFilled from "../images/star-filled.png"

const RecipeTile = (props) => {
  return (
    <>
      <Link to={`/recipes/${props.id}`} style={{ textDecoration: "none" }}>
        <div className="recipe-tile">
          <img src={props.image} alt="recipe" height={256} width={256}></img>{" "}
          {/*using this div as a placeholder for the image*/}
          <p className="recipe-tile-title">{props.title}</p>
          <p className="recipe-tile-likes">{props.likes}</p>
          <img
            className="recipe-tile-like-image"
            src={starFilled}
            alt="star"
            height={32}
            width={32}
          ></img>
          <p className="recipe-tile-author">by {props.author.toUpperCase()}</p>
        </div>
      </Link>
    </>
  );
};

export default RecipeTile;
