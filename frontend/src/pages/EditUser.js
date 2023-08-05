import Form from "react-bootstrap/Form";
import React from "react";
import apiRequest from "../datafetch/apiRequest";
import { Button } from "react-bootstrap";

function EditUser({ editForm, handleCustomerUpdate, handleChange }) {
  let { id, username, password, isAdmin } = editForm;

  // PATCH request; calls handleCustomerUpdate to push changes to the page
  const handleEditForm = async (event) => {
    const token = localStorage.getItem("accessToken");
    event.preventDefault();

    const objReq = {
      method: "PATCH",
      headers: {
        authorization: `token ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `id=${id}&username=${username}&password=${password}&isAdmin=${isAdmin}`,
    };
    const result = await apiRequest(
      "http://localhost:5000/users/update",
      objReq
    );
    const resultObj = await result.json();
    console.log(resultObj);
    handleCustomerUpdate(resultObj);
  };

  return (
    <div>
      <h4>Edit User</h4>
      <Form onSubmit={handleEditForm}>
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <Form.Control
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <Form.Control
          type="text"
          name="isAdmin"
          value={isAdmin}
          onChange={handleChange}
        />
        <Button variant="primary" type="submit">
          Submit Changes
        </Button>
      </Form>
    </div>
  );
}
export default EditUser;
