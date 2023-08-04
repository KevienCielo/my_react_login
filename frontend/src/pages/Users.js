import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState, useEffect } from "react";
import apiRequest from "../datafetch/apiRequest";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState("");
  const [username, setUsername] = useState("");
  const [searchMsg, setSearchMsg] = useState("");
  const [variant, setVariant] = useState("");

  const [usernameAdd, setUsernameAdd] = useState("");
  const [passwordAdd, setPasswordAdd] = useState("");
  const [addMsg, setAddMsg] = useState("");
  const [variantAdd, setVariantAdd] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);

  const fetchUsers = async (objReq) => {
    const response = await apiRequest("http://localhost:5000/users", objReq);
    const userlist = await response.json();
    setUsers(userlist);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const objReq = {
      method: "GET",
      headers: {
        authorization: `token ${token}`,
      },
    };
    fetchUsers(objReq);
  }, []);

  const handleAdmin = (isAdmin) => {
    return isAdmin ? "Yes" : "No";
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("accessToken");
    const objReq = {
      method: "POST",
      headers: {
        authorization: `token ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `username=${username}`,
    };
    const result = await apiRequest(
      "http://localhost:5000/users/search",
      objReq
    );
    const resultObj = await result.json();

    if (resultObj.Code === "200") {
      const resultArrObj = [
        {
          id: resultObj.id,
          username: resultObj.username,
          password: resultObj.password,
          isAdmin: resultObj.isAdmin,
        },
      ];
      setUsers(resultArrObj);
      setSearchMsg(resultObj.Msg);
      setVariant("success");
    } else {
      setSearchMsg(resultObj.Msg);
      setVariant("danger");
    }
  };

  const handleAdd = async (event) => {
    const token = localStorage.getItem("accessToken");
    event.preventDefault();
    const objReq = {
      method: "POST",
      headers: {
        authorization: `token ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `username=${usernameAdd}&password=${passwordAdd}&isAdmin=${isAdmin}`,
    };
    const result = await apiRequest("http://localhost:5000/users/add", objReq);
    const resultObj = await result.json();
    if (resultObj.Code === "200") {
      const addedUser = {
        id: resultObj.id,
        username: resultObj.username,
        password: resultObj.password,
        isAdmin: resultObj.isAdmin,
      };
      const newUserList = [...users, addedUser];

      setUsers(newUserList);
      setVariantAdd("success");
      setAddMsg(resultObj.Msg);
    } else {
      setVariantAdd("danger");
      setAddMsg(resultObj.Msg);
    }
  };

  return (
    <article className="Books col mt-5 mb-5">
      <div className="w-25 mb-2 d-inline-block">
        <Form className="d-flex" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Username"
            className="me-2 rounded-pill"
            aria-label="Search"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Button
            className="rounded-pill"
            variant="outline-primary"
            type="submit"
          >
            Search
          </Button>
        </Form>
      </div>
      <Alert className="d-inline-block ms-4" key={variant} variant={variant}>
        {searchMsg}
      </Alert>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Username</th>
            <th>Password</th>
            <th>Administrator</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{handleAdmin(user.isAdmin)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                list empty
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <hr />
      <section className="mt-5 bor">
        <Form className="w-25" onSubmit={handleAdd}>
          <legend className="text-start mb-0 d-inline-block">Add User</legend>
          <Row className="mb-3">
            <Alert
              className="d-inline-block ms-4 mb-0"
              key={variantAdd}
              variant={variantAdd}
            >
              {addMsg}
            </Alert>

            <FloatingLabel
              controlId="username"
              label="username"
              className="mb-3 p-1"
            >
              <Form.Control
                type="text"
                placeholder="username"
                value={usernameAdd}
                onChange={(event) => setUsernameAdd(event.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="password"
              label="password"
              className="mb-3 p-1"
            >
              <Form.Control
                type="text"
                placeholder="password"
                value={passwordAdd}
                onChange={(event) => setPasswordAdd(event.target.value)}
              />
            </FloatingLabel>
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Admin"
                  name="group1"
                  type={type}
                  id={`inline-${type}-1`}
                  value={true}
                  onChange={(event) => setIsAdmin(event.target.value)}
                />
                <Form.Check
                  inline
                  label="Public"
                  name="group1"
                  type={type}
                  id={`inline-${type}-2`}
                  value={false}
                  onChange={(event) => setIsAdmin(event.target.value)}
                />
              </div>
            ))}
          </Row>
          <Button variant="primary" type="submit" value={`submit`}>
            Add
          </Button>
        </Form>
      </section>
      <hr />
    </article>
  );
};

const Authenticate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 3500);
  });

  return (
    <div className="root-main">
      <h1 className="mt-5 text-center display-1">
        You're not an Administrator! (-__-)
      </h1>
      <p className=" text-center h1">
        No permission to view this page. You'll be redirected to Home page
      </p>
    </div>
  );
};

const Users = () => {
  const admin = localStorage.getItem("admin");
  const isAdmin = admin === "true" && true;

  return isAdmin ? <Admin /> : <Authenticate />;
};

export default Users;
