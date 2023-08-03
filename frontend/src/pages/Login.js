import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import apiRequest from "../datafetch/apiRequest";
import { useNavigate } from "react-router-dom";

const Login = ({ status, handleStatus }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [variant, setVariant] = useState("");
  const navigate = useNavigate();
  const setStatus = handleStatus;

  const handleSubmit = async (event) => {
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
      console.log(
        `username(from backend): ${resultObj.username}\n isAdmin(from backend): ${resultObj.isAdmin}\n access token: ${resultObj.accessToken}`
      );
      localStorage.setItem("accessToken", resultObj.accessToken);
      setTimeout(() => {
        setStatus();
      }, 500);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } else {
      setVariant("danger");
      setSuccessMsg(resultObj.Msg);
    }
  };

  return (
    <article className="Login col">
      <hr />
      <section>
        <Form className=" w-25 m-auto" onSubmit={handleSubmit}>
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
