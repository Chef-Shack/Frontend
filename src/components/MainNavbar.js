import { Container, Navbar, Nav } from "react-bootstrap"
import "../css/navbar-styles.css"

const MainNavbar = () => {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand><h3 className="brand">ChefShack</h3></Navbar.Brand>

            </Container>

            {/* <Nav.Link ms="auto">Login</Nav.Link> */}
        </Navbar>
    )
}

export default MainNavbar;