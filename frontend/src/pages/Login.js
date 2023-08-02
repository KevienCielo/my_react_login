import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import apiRequest from "../datafetch/apiRequest";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
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
    const okresult = await result.json();

    if (okresult.Code === "200") {
      setSuccessMsg(okresult.Msg);
      console.log(
        `username(from backend): ${okresult.username}\n password(from backend): ${okresult.password}\n access token: ${okresult.accessToken}`
      );
    } else {
      setSuccessMsg(okresult.Msg);
    }
  };

  return (
    <article className="Login col">
      <h1 className="mt-5 text-center">This is Login page</h1>
      <hr />
      <section>
        <Form className=" w-25 m-auto" onSubmit={handleSubmit}>
          <legend className="text-center">Login</legend>
          <Row className="mb-3">
            <b>{successMsg}</b>
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
