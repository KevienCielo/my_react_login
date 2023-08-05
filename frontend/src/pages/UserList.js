import React, { useState } from "react";
import User from "./User";
import { Table } from "react-bootstrap";
import EditUser from "./EditUser";

function UserList({ users, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    username: "",
    password: "",
    isAdmin: "",
  });

  function handleUserUpdate(updatedUser) {
    setIsEditing(false);
    onUpdateUser(updatedUser);
  }

  function handleChange(e) {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  }

  function changeEditState(user) {
    if (user.id === editForm.id) {
      setIsEditing((isEditing) => !isEditing);
    } else if (isEditing === false) {
      setIsEditing((isEditing) => !isEditing);
    }
  }

  // capture the customer you wish to edit, set to state
  function captureEdit(clickedUser) {
    let filtered = users.filter((user) => user.id === clickedUser.id);
    setEditForm(filtered[0]);
  }

  return (
    <div>
      {isEditing ? (
        <EditUser
          editForm={editForm}
          handleChange={handleChange}
          handleCustomerUpdate={handleUserUpdate}
        />
      ) : null}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Administrator</th>
            <th colSpan={2}>Modify Customer</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User
              key={user.id}
              user={user}
              captureEdit={captureEdit}
              changeEditState={changeEditState}
              onUpdateUser={onUpdateUser}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default UserList;
