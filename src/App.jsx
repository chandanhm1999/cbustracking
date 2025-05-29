import "./App.css";
import Home from "./pages/Home";
import RoutesPage from "./pages/RoutesPage";
import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default App;
