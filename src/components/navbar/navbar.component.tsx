import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Logo from "../../assets/logo.png";
import { NavbarDiv } from "./navbar.styles";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <NavbarDiv>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="links">
        <span>{currentUser?.username}</span>
        {currentUser ? (
          <span onClick={logout}>Logout</span>
        ) : (
          <Link className="link" to="/login">
            Login
          </Link>
        )}
        <span className="write">
          <Link className="link" to="/create">
            Write
          </Link>
        </span>
      </div>
    </NavbarDiv>
  );
};

export default Navbar;
