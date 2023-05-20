import styled from "styled-components";
import { LightGreen } from "../../constants";

export const AuthDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${LightGreen};

  form {
    display: flex;
    flex-direction: column;
    padding: 50px;
    background-color: white;
    width: 200px;
    gap: 20px;

    input {
      padding: 10px;
      border: none;
      border-bottom: 1px solid gray;
    }

    button {
      padding: 10px;
      border: none;
      background-color: teal;
      cursor: pointer;
      color: white;
    }

    p {
      font-size: 12px;
      color: red;
      text-align: center;
    }

    span {
      font-size: 12px;
      text-align: center;
    }
  }
`;
