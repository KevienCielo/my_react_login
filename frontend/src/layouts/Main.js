import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="container">
      <Outlet></Outlet>
    </main>
  );
};

export default Main;
