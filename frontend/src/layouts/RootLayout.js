import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const DefLayout = () => {
  return (
    <div className="root-main">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
};

const Authenticate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  });

  return (
    <div className="root-main">
      <h1 className="mt-5 text-center display-1">Login First! (-__-)</h1>
    </div>
  );
};

const RootLayout = () => {
  let status = localStorage.getItem("status");
  const isLogged = status === "true" && true;
  return isLogged ? <DefLayout /> : <Authenticate />;
};

export default RootLayout;
