import { useState } from "react";
import { loginUserAPI } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUserAPI(formData);
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" className="login-input" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" className="login-input" onChange={handleChange} required />
                    {error && <div className="login-error">{error}</div>}
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p>New user? 
                    <button className="register-link" onClick={() => navigate("/register")}>
                        Register here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
