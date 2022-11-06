import "../css/recipe-tile-styles.css"


const RecipeTile = (props) => {
    return (
            <>
                <div className="recipe-tile">
                    <img src={props.image} height={256} width={256}></img> {/*using this div as a placeholder for the image*/}
                    <p className="recipe-tile-title">{props.title}</p>
                    <p className="recipe-tile-author">by {props.author.toUpperCase()}</p>
                </div>
            </>
    )
}

export default RecipeTile;