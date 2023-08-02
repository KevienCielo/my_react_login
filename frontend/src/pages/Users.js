import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import apiRequest from "../datafetch/apiRequest";

const Users = () => {
  const [users, setUsers] = useState("");
  const fetchUsers = async (objReq) => {
    console.log(objReq);
    const response = await apiRequest("http://localhost:5000/users", objReq);
    const userlist = await response.json();
    console.log(userlist);
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

  return (
    <article className="Books col mt-5">
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
    </article>
  );
};

export default Users;
