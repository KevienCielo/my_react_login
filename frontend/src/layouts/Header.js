import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark">
        <Nav className="container">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/books">Books</Nav.Link>
          <Nav.Link href="/users">Users</Nav.Link>
          <Nav.Link className="ms-auto" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
