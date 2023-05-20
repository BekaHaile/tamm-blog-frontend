import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { uploadFile } from "../../services/upload";
import { updateBlog } from "../../services/updateBlog";
import {
  AddContainer,
  Buttons,
  ContentContainer,
  Editor,
  EditorContainer,
  File,
  Item,
  Menu,
} from "./createBlog.styles";
import { createNewBlog } from "../../services/createNewBlog";

const CreateBlog = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState<File | undefined>(undefined);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      const res = await uploadFile(formData);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e: any) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await updateBlog({
            title,
            content: value,
            img: file && imgUrl ? imgUrl : "",
          })
        : await createNewBlog({
            title,
            content: value,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AddContainer>
      <ContentContainer>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <EditorContainer>
          <Editor
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </EditorContainer>
      </ContentContainer>
      <Menu>
        <Item>
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) =>
              e.target.files ? setFile(e.target.files[0]) : null
            }
          />
          <File htmlFor="file">Upload Image</File>
          <Buttons>
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </Buttons>
        </Item>
      </Menu>
    </AddContainer>
  );
};

export default CreateBlog;
