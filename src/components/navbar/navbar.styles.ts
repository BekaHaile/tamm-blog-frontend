import styled from "styled-components";
import { LightGreen } from "../../constants";

export const NavbarDiv = styled.div`
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoDiv = styled.div`
  img {
    width: 120px;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h6 {
    font-size: 16px;
    font-weight: 300;
  }

  span {
    cursor: pointer;
  }
`;

export const Write = styled.span`
  background-color: ${LightGreen};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  border: 1px solid white;

  &:hover {
    color: teal;
    background-color: white;
    border: 1px solid teal;
  }
`;
