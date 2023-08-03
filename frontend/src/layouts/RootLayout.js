import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";

const DefLayout = ({ handleStatus }) => {
  return (
    <div className="root-main">
      <Header handleStatus={handleStatus}></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
};

const Authenticate = () => {
  return (
    <div className="root-main">
      <h1 className="mt-5 text-center display-1">Login First! (-__-)</h1>
    </div>
  );
};

const RootLayout = ({ status, handleStatus }) => {
  return status ? <DefLayout handleStatus={handleStatus} /> : <Authenticate />;
};

export default RootLayout;
