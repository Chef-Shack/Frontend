import "../css/recipe-tile-styles.css"
import { Link } from "react-router-dom";

const RecipeTile = (props) => {
    return (
            <>
                <Link to={`/recipes/${props.id}`} style={{ textDecoration: 'none' }}>
                    <div className="recipe-tile">
                        <img src={props.image} alt="recipe" height={256} width={256}></img> {/*using this div as a placeholder for the image*/}
                        <p className="recipe-tile-title">{props.title}</p>
                        <p className="recipe-tile-author">by {props.author.toUpperCase()}</p>
                    </div>
                </Link>
            </>
    )
}

export default RecipeTile;