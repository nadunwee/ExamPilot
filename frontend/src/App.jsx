import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePages/HomePage";
import Login from "./components/AccessPages/Login";
import Register from "./components/AccessPages/Register";
import ExamsPage from "./components/StudentPages/ExamsPage";
import AdminExams from "./components/AdminPages/AdminExams";
import AdminLecturers from "./components/AdminPages/AdminLecturers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/admin-exams" element={<AdminExams />} />
        <Route path="/admin-lecturers" element={<AdminLecturers />} />
      </Routes>
    </Router>
  );
}

export default App;
