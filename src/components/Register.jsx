import { useState } from "react";
import { registerUserAPI } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import "./Register.css";  // Import the CSS file

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "", email: "", password: "", fatherName: "", birthday: "", anniversaryDate: ""
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUserAPI(formData);
            alert("Registered successfully!");
            navigate("/login");
        } catch (err) {
            alert("Error: " + (err.response?.data?.message || "Something went wrong"));
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <input type="text" name="fatherName" placeholder="Father's Name" onChange={handleChange} required />
                    <input type="date" name="birthday" onChange={handleChange} required />
                    <input type="date" name="anniversaryDate" onChange={handleChange} />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
