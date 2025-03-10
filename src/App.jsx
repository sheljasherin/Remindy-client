import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Header from "./components/Header";
import Home from "./components/Home";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");
    return token || adminToken ? children : <Navigate to="/login" />;
};
const AdminPrivateRoute = ({ children }) => {
    const adminToken = localStorage.getItem("adminToken");
    
    return adminToken ? children : <Navigate to="/admin-login" />;
};

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />


                <Route path="/admin-dashboard" element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>} />
            </Routes>
        </Router>
    );
};

export default App;
