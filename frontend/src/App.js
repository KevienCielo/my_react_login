import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import BooksPage from "./pages/Books";
import UsersPage from "./pages/Users";
import RootLayout from "./layouts/RootLayout";
import LoginLayout from "./layouts/LoginLayout";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route element={<LoginLayout />}>
        <Route path="/" element={<Login />}></Route>
      </Route>
      <Route element={<RootLayout />}>
        <Route path="/home" element={<HomePage></HomePage>}></Route>
        <Route path="/books" element={<BooksPage></BooksPage>}></Route>
        <Route path="/users" element={<UsersPage></UsersPage>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
