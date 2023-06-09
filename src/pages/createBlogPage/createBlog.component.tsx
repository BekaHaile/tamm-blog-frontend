import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
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
  PublishButton,
} from "./createBlog.styles";
import { createNewBlog } from "../../services/createNewBlog";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBlog = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.content || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [image, setImage] = useState(state?.img || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      const res = await uploadFile(formData);
      return res;
    } catch (err) {
      toast.error("Error uploading Image");

      console.log(err);
    }
  };

  const handleClick = async (e: any) => {
    e.preventDefault();

    const imgUrl = file ? await upload() : "";

    setImage(imgUrl);

    try {
      state
        ? await updateBlog(
            {
              title,
              content: value,
              img: file && imgUrl ? imgUrl : "",
            },
            state.id
          )
        : await createNewBlog({
            title,
            content: value,
            img: file ? imgUrl : "",
          });
      toast.success("Blog created successfully");
      navigate("/");
    } catch (err) {
      toast.error("Error creating blog");

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
          value={title}
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
            <b>Visibility: </b> Public
          </span>
          {image && (
            <img
              src={
                image.includes("http") ? image : API_URL + "/uploads/" + image
              }
              width={200}
              height={100}
              alt="Blog"
              style={{ objectFit: "cover" }}
            />
          )}
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
            <PublishButton onClick={handleClick} disabled={!title || !value}>
              {state ? "Update" : "Publish"}
            </PublishButton>
          </Buttons>
        </Item>
      </Menu>
    </AddContainer>
  );
};

export default CreateBlog;
