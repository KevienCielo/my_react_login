import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const Header = ({ handleStatus }) => {
  const navigate = useNavigate();
  const setStatus = handleStatus;
  const handleHome = (event) => {
    event.preventDefault();
    navigate("/home");
  };
  const handleBooks = (event) => {
    event.preventDefault();
    navigate("/books");
  };
  const handleUsers = (event) => {
    event.preventDefault();
    navigate("/users");
  };
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("accessToken");
    setTimeout(() => {
      setStatus();
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
