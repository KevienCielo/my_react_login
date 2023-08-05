import React from "react";
import Button from "react-bootstrap/Button";
import apiRequest from "../datafetch/apiRequest";

function User({ user, captureEdit, changeEditState, onUpdateUser }) {
  const handleAdmin = (isAdmin) => {
    return isAdmin ? "Yes" : "No";
  };

  const handleDelete = async (id) => {
    const objReq = {
      method: "DELETE",
    };
    const result = await apiRequest(
      "http://localhost:5000/delete-user/" + id,
      objReq
    );
    const resultObj = await result.json();
    onUpdateUser(resultObj);
  };

  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.password}</td>
      <td>{handleAdmin(user.isAdmin)}</td>
      <td>
        <Button
          variant="success"
          onClick={() => {
            captureEdit(user);
            changeEditState(user);
          }}
        >
          Update
        </Button>
      </td>
      <td>
        <Button variant="danger" onClick={() => handleDelete(user.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default User;
