import Logo from "../../assets/logo.png";
import { FooterDiv } from "./footer.styles";

const Footer = () => {
  return (
    <FooterDiv>
      <img src={Logo} alt="" />
      <span>
        Made by <b>Beka Haile</b> using React.
      </span>
    </FooterDiv>
  );
};

export default Footer;
