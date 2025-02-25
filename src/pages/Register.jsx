import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    father: "",
    birthday: "",
    anniversary: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5001/api/auth/register"; // Updated API route
      await axios.post(url, data);
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      setError(errorMessage);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <div className="register-left">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="register-white-btn">
              Sign In
            </button>
          </Link>
        </div>
        <div className="register-right">
          <form className="register-form" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input type="text" placeholder="Full Name" name="name" onChange={handleChange} value={data.name} required className="register-input" />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} required className="register-input" />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password} required className="register-input" />
            <input type="text" placeholder="Father's Name" name="father" onChange={handleChange} value={data.father} required className="register-input" />
            <input type="date" name="birthday" onChange={handleChange} value={data.birthday} required className="register-input" />
            <input type="date" name="anniversary" onChange={handleChange} value={data.anniversary} required className="register-input" />
            {error && <div className="register-error">{error}</div>}
            <button type="submit" className="register-green-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
