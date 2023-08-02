import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import BlogPage from "./pages/Blog";
import RouteLayout from "./layouts/RootLayout";

function App() {
  return (
    <RouteLayout>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/home" element={<HomePage></HomePage>}></Route>
        <Route path="/about" element={<AboutPage></AboutPage>}></Route>
        <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
        <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
      </Routes>
    </RouteLayout>
  );
}

export default App;
