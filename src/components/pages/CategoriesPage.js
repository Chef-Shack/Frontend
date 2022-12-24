import "../../css/categories-page-styles.css";
import MainNavbar from "../MainNavbar";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  return (
    <>
      <MainNavbar />

      <h1 className="categories-page-header">
        Browse <span className="categories-page-header-span">Categories</span>
      </h1>

      <div className="categories">
          <div className="category">
          <Link to="breakfast">
            <img
              className="category-image"
              src="https://images.pexels.com/photos/892649/pexels-photo-892649.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="breakfast"
            ></img>

            <h3 className="category-name">Breakfast</h3>
            </Link>
          </div>


        <div className="category">
          <Link to="dessert">
            <img
              className="category-image"
              src="https://images.pexels.com/photos/4945142/pexels-photo-4945142.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="donuts"
            ></img>

            <h3 className="category-name">Dessert</h3>
          </Link>
        </div>

        <div className="category">
          <Link to="japanese">
            <img
              className="category-image"
              src="https://images.pexels.com/photos/343870/pexels-photo-343870.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="sushi"
            ></img>

            <h3 className="category-name">Japanese</h3>
          </Link>
        </div>

        <div className="category">
          <Link to="italian">
            <img
              className="category-image"
              src="https://images.pexels.com/photos/6147834/pexels-photo-6147834.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="pizza"
            ></img>

            <h3 className="category-name">Italian</h3>
          </Link>
        </div>

        <div className="category">
          <Link to="american">
            <img
              className="category-image"
              src="https://images.pexels.com/photos/9201333/pexels-photo-9201333.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="burger"
            ></img>

            <h3 className="category-name">American</h3>
          </Link>
        </div>

        <div className="category">
          <Link to="indian">
            <img
              className="category-image"
              src="https://images.pexels.com/photos/5127333/pexels-photo-5127333.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="indian-food"
            ></img>

            <h3 className="category-name">Indian</h3>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
