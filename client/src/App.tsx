import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Home from "./pages/Home";
import Sharea from "./pages/Sharea";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  return (
    <div className="bg-linear-to-b from-teal to-cyan min-h-screen">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/room/:params" element={<Sharea />}></Route>
      </Routes>
    </div>
  );
}

export default AppWrapper;
