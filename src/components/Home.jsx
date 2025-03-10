import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Remindy</h1>
            <p>If you are a new user, click <Link to="/register">Register</Link>.</p>
            <p>If you are an existing user, click <Link to="/login">Login</Link>.</p>
            <p>If you have admin credentials, click <Link to="/admin-login">Admin</Link>.</p>
        </div>
    );
};

export default Home;
