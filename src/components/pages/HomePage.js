import MainNavbar from "../MainNavbar";
import "../../css/home-page-styles.css"
import { Button } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <MainNavbar />

      <div className="body-content text-center">
        <h1 className="header">Find and Share Recipes With <span className="header-span">ChefShack</span></h1>
        <p className="desc">Chefshack is a community where everyone from home cooks to professional chefs come together to share and discover recipes.</p>
        <Button href="recipes" className="custom-button" id="button" variant="outline-success">Get Started</Button>
      </div>
    </>
  );
};

export default HomePage;
