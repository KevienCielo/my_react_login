import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Contact = () => {
  return (
    <article className="col">
      <h1 className="mt-5 text-center">This is Contact page</h1>
      <hr />
      <section>
        <Form className=" w-50 m-auto">
          <legend>Contact Us</legend>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>
            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your message here..."
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </section>
      <hr />
    </article>
  );
};

export default Contact;
