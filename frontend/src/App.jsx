import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Confirmation from "./pages/Confirmation";
import Admin from "./pages/Admin";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/confirmation/:id" element={<Confirmation />} />
    </Routes>
  );
}

export default App;
