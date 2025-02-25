import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "", secretKey: "" });
  const [userType, setUserType] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5001/api/auth/login";
      const response = await axios.post(url, { ...data, userType });

      if (response.data.userExists) {
        localStorage.setItem("token", response.data.token);
        setSuccess("Login successful! Redirecting...");
        setError("");

        setTimeout(() => {
          if (userType === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/");
          }
        }, 1500);
      } else {
        setError("User does not exist. Please register first.");
        setSuccess("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
      setSuccess("");
    }
  };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>

            <div className="user_type_selection">
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  checked={userType === "user"}
                  onChange={handleUserTypeChange}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="admin"
                  checked={userType === "admin"}
                  onChange={handleUserTypeChange}
                />
                Admin
              </label>
            </div>

            <input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} required className="input" />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password} required className="input" />

            {userType === "admin" && (
              <input type="text" placeholder="Secret Key" name="secretKey" onChange={handleChange} value={data.secretKey} required className="input" />
            )}

            {error && <div className="error_msg">{error}</div>}
            {success && <div className="success_msg">{success}</div>}

            <button type="submit" className="green_btn">Sign In</button>
          </form>
        </div>

        <div className="right">
          <h1>New Here?</h1>
          <Link to="/register">
            <button type="button" className="white_btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
