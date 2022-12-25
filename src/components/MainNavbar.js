import { Container, Navbar, Nav, NavbarBrand, NavLink } from "react-bootstrap";
import "../css/navbar-styles.css";

const MainNavbar = () => {
  return (
    <Navbar>
      <Container>
        <NavbarBrand>
          <h3>ChefShack</h3>
        </NavbarBrand>

        <Nav className="ms-auto">
          <NavLink href="/recipes"><p>Recipes</p></NavLink>
          <NavLink href="/login"><p>Login</p></NavLink>
          {window.localStorage.getItem('authenticated') && <NavLink href="/create-recipe"><p>Create</p></NavLink>}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
