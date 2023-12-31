import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import apiRequest from "../datafetch/apiRequest";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [variant, setVariant] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const objReq = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `username=${username}&password=${password}`,
    };
    const result = await apiRequest("http://localhost:5000/login", objReq);
    const resultObj = await result.json();

    if (resultObj.Code === "200") {
      setVariant("success");
      setSuccessMsg(resultObj.Msg);

      localStorage.setItem("accessToken", resultObj.accessToken);
      localStorage.setItem("status", "true");
      localStorage.setItem("admin", resultObj.isAdmin);

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      setVariant("danger");
      setSuccessMsg(resultObj.Msg);
    }
  };

  return (
    <article className="Login co">
      <hr />
      <section>
        <Form className="w-25 m-auto" onSubmit={handleLogin}>
          <legend className="text-center">Login</legend>
          <Row className="mb-3">
            <Alert key={variant} variant={variant}>
              {successMsg}
            </Alert>

            <FloatingLabel
              controlId="Username"
              label="Username"
              className="mb-3 p-1"
            >
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="Password"
              label="Password"
              className="p-1"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
          </Row>
          <Button variant="primary" type="submit" value={`submit`}>
            Login
          </Button>
        </Form>
      </section>
      <hr />
    </article>
  );
};

export default Login;
