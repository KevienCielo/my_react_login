import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const HeaderLogin = () => {
  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="m-auto">
            <h1 className="mt-5 text-center text-light ">This is Login page</h1>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderLogin;
