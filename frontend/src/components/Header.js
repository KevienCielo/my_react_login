import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleHome = (event) => {
    navigate("/home");
  };
  const handleBooks = (event) => {
    navigate("/books");
  };
  const handleUsers = (event) => {
    navigate("/users");
  };
  const handleLogout = (event) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("status");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark">
        <Nav className="container">
          <Nav.Link onClick={handleHome}>Home</Nav.Link>
          <Nav.Link onClick={handleBooks}>Books</Nav.Link>
          <Nav.Link onClick={handleUsers}>Users</Nav.Link>
          <Nav.Link className="ms-auto" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
