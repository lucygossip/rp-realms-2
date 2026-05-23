import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AppNavbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="forum-navbar">
      <Container>

        {/* Brand */}
        <Navbar.Brand as={Link} to="/">
          ForumBoard
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">

          <Nav className="align-items-center">

            {/* Always visible */}
            <Nav.Link as={NavLink} to="/">
              Forums
            </Nav.Link>

            {/* Only logged-in users */}
            {user && (
              <Nav.Link as={NavLink} to="/create-post">
                New Thread
              </Nav.Link>
            )}
            {user && (
  <Nav.Link
    as={Link}
    to="/profile"
  >
    {user.username}
  </Nav.Link>
)}

            {/* Auth buttons */}
            {!user ? (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>

                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <Button
                variant="outline-light"
                size="sm"
                onClick={handleLogout}
                className="ms-2"
              >
                Logout
              </Button>
            )}

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default AppNavbar;