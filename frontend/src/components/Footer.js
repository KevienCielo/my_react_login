import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
const Footer = () => {
  return (
    <footer>
      <Navbar className=" mt-5" fixed="bottom" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="m-auto text-muted" href="/">
            &copy; Copyright. Mark Cielo
          </Navbar.Brand>
        </Container>
      </Navbar>
    </footer>
  );
};

export default Footer;
