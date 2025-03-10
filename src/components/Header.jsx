import { Link } from "react-router-dom";
import './Header.css'
const Header = () => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src="/logo.png" alt="Logo" className="logo" />
        
            </div>
            <div className="links-container">
                <Link to="/" className="link">Home</Link>

                {!token && !adminToken && (
                    <>
                        <Link to="/register" className="link">Register</Link>
                        <Link to="/login" className="link">Login</Link>
                        <Link to="/admin-login" className="link">Admin Login</Link>
                    </>
                )}

                {token && !adminToken && (
                    <Link to="/dashboard" className="link">Dashboard</Link>
                )}

                {adminToken && (
                    <Link to="/admin-dashboard" className="link">Admin Dashboard</Link>
                )}

                {(token || adminToken) && (
                    <button 
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("adminToken");
                            window.location.href = "/login";
                        }} 
                        className="button"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Header;
