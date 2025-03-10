import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("adminToken");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="links-container">
                <Link to="/" className="link">Home</Link>

                {!token && !adminToken ? (
                    <>
                        <Link to="/login" className="link">Login</Link>
                        <Link to="/register" className="link">Register</Link>
                        <Link to="/admin-login" className="link">Admin</Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard" className="link">Dashboard</Link>
                        <button onClick={handleLogout} className="button">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
