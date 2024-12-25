import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePages/HomePage";
import Login from "./components/AccessPages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/log-in" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
