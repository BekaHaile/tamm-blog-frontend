import { styled } from "styled-components";
import { LightGreen } from "../../constants";

export const FooterDiv = styled.footer`
  padding: 20px;
  background-color: ${LightGreen};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  img {
    height: 50px;
  }
`;
