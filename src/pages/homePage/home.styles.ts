import { styled } from "styled-components";
import { LightGreen } from "../../constants";

export const PostContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 150px;
`;

export const Post = styled.div`
  display: flex;
  gap: 100px;

  &:nth-child(2n + 1) {
    flex-direction: row-reverse;
  }
`;

export const Img = styled.div`
  flex: 2;
  position: relative;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    background-color: ${LightGreen};
    position: absolute;
    top: 20px;
    left: -20px;
    z-index: -1;
  }

  img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
  }
`;

export const Content = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    font-size: 48px;
  }

  p {
    font-size: 18px;
  }

  button {
    width: max-content;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    background-color: white;
    border: 1px solid teal;
    color: teal;

    &:hover {
      border: 1px solid white;
      background-color: ${LightGreen};
      color: black;
    }
  }
`;
