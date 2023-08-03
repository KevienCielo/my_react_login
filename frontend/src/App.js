import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import BooksPage from "./pages/Books";
import UsersPage from "./pages/Users";
import RootLayout from "./layouts/RootLayout";
import LoginLayout from "./layouts/LoginLayout";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [status, setStatus] = useState(false);

  function handleStatus() {
    setStatus(!status);
  }

  return (
    <Routes>
      <Route element={<LoginLayout />}>
        <Route
          path="/"
          element={<Login status={status} handleStatus={handleStatus} />}
        ></Route>
      </Route>
      <Route
        element={<RootLayout status={status} handleStatus={handleStatus} />}
      >
        <Route path="/home" element={<HomePage></HomePage>}></Route>
        <Route path="/books" element={<BooksPage></BooksPage>}></Route>
        <Route path="/users" element={<UsersPage></UsersPage>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
