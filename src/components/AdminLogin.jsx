import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const AdminLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/admin/login", { email, password });
            localStorage.setItem("adminToken", res.data.token);
            navigate("/admin-dashboard");
        } catch (err) {
            setError("you are not admin",err.message);
        }
    };

    return (
        <div className="container">
            <h2>admin login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={AdminLogin}>
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
