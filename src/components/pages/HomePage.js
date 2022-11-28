import MainNavbar from "../MainNavbar";
import "../../css/home-page-styles.css"
import { Button } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <MainNavbar />

      <div className="body-content text-center">
        <h1 className="header">Find and Share Recipes With <span className="header-span">ChefShack</span></h1>
        <p className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <Button href="recipes" className="custom-button" id="button" variant="outline-success">Get Started</Button>
      </div>
    </>
  );
};

export default HomePage;
