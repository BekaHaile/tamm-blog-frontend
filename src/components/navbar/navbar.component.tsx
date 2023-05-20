import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Logo from "../../assets/logo.png";
import { LinksContainer, LogoDiv, NavbarDiv, Write } from "./navbar.styles";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <NavbarDiv>
      <LogoDiv>
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </LogoDiv>
      <LinksContainer>
        <span>{currentUser?.username}</span>
        {currentUser ? (
          <span onClick={logout}>Logout</span>
        ) : (
          <Link className="link" to="/login">
            Login
          </Link>
        )}
        <Write>
          <Link className="link" to="/create">
            Write
          </Link>
        </Write>
      </LinksContainer>
    </NavbarDiv>
  );
};

export default Navbar;
