import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePages/HomePage";
import Login from "./components/AccessPages/Login";
import Register from "./components/AccessPages/Register";
import ExamsPage from "./components/StudentPages/ExamsPage";
import AdminExams from "./components/AdminPages/AdminExams";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/admin-exams" element={<AdminExams />} />
      </Routes>
    </Router>
  );
}

export default App;
