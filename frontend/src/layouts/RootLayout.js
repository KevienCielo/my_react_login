import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
const RootLayout = () => {
  return (
    <div className="root-main">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
};

// const Authenticate = () => {
//   return (
//     <div className="root-main">
//       <h1 className="mt-5 text-center display-1">Login First! -___-</h1>{" "}
//     </div>
//   );
// };

// export default localStorage.getItem("accessToken") ? RootLayout : Authenticate;

export default RootLayout;
