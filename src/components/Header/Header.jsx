import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search-b.png";

const Header = () => {
const navigate = useNavigate();
  return (
    <div className="navbar">
      <img src={logo} className="logoimg" alt="Logo" onClick={() => navigate('/')} />
      <ul className="nav-menu">
        <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => navigate('/login')}>Login</li>
        <li onClick={() => navigate('/register')}>Register</li>
        <li onClick={() => navigate('/help')}>Help</li>
      </ul>
      <div className="search-box">
        <input type="text" placeholder="Search" />
        <img src={searchIcon} alt="Search" className="search-icon" />
      </div>
    </div>
  );
};

export default Header;
