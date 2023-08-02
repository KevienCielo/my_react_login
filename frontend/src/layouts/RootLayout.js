import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
const RouteLayout = ({ children }) => {
  return (
    <div className="root-main">
      <Header></Header>
      <Main cdata={children}></Main>
      <Footer></Footer>
    </div>
  );
};

export default RouteLayout;
