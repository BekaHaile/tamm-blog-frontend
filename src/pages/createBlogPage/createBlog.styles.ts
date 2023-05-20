import ReactQuill from "react-quill";
import { styled } from "styled-components";

export const AddContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
  width: 85%;
  margin-inline: auto;
`;
export const ContentContainer = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  gap: 20px;

  input {
    padding: 10px;
    border: 1px solid lightgray;
  }
`;

export const EditorContainer = styled.div`
  height: 350px;
  overflow: scroll;
  border: 1px solid lightgray;
`;

export const Editor = styled(ReactQuill)`
  height: 100%;
  border: none;
`;

export const Menu = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Item = styled.div`
  border: 1px solid lightgray;
  padding: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  color: #555;
  max-height: 400px;

  h1 {
    font-size: 20px;
  }
`;

export const File = styled.label`
  text-decoration: underline;
  cursor: pointer;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;

  :first-child {
    cursor: pointer;
    color: teal;
    background-color: white;
    border: 1px solid teal;
    padding: 3px 5px;
  }
`;

export const PublishButton = styled.button`
  cursor: pointer;
  color: white;
  background-color: teal;
  border: 1px solid teal;
  padding: 3px 5px;
  opacity: ${({ disabled }) => (disabled ? "0.3" : "1")};
`;
