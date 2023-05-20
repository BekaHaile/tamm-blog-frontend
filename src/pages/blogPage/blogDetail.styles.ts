import { styled } from "styled-components";

export const DetailContainer = styled.div`
  display: flex;
  gap: 50px;
  width: 85%;
  margin-inline: auto;
`;

export const Content = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  gap: 20px;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  h1 {
    font-size: 42px;
    color: #333;
  }

  p {
    text-align: justify;
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    font-weight: bold;
  }
`;

export const EditContainer = styled.div`
  display: flex;
  gap: 5px;

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;
