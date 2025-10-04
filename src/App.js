import { Route, Router, Routes, useLocation } from "react-router";
import "./App.css";
import Dashboard from "./Components/Dashboard.js";
import Sidebar from "./Components/Sidebar/Sidebar.js";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Sidebar location={location}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Explore" element={<h1> Explore</h1>} />
          <Route path="/Calender" element={<h1> Calender</h1>} />
          <Route path="/Settings" element={<h1> Settings</h1>} />
        </Routes>
      </Sidebar>
    </div>
  );
}

export default App;
