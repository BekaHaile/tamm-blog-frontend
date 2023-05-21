import { useEffect, useState, useContext } from "react";
import Edit from "../../assets/edit.png";
import Delete from "../../assets/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import DOMPurify from "dompurify";
import { Blog } from "../../models/blog";
import { getBlog } from "../../services/getBlog";
import { deleteBlog } from "../../services/deleteBlog";
import {
  Content,
  DetailContainer,
  EditContainer,
  User,
} from "./blogDetail.styles";
import moment from "moment";
import { API_URL, ImgPlaceholder, UserImgPlaceholder } from "../../constants";
import { toast } from "react-toastify";

const BlogDetail = () => {
  const [blog, setBlog] = useState<Blog>({
    id: "1",
    title: "Placeholder Post 1",
    content:
      "<p> This is a placeholder description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, quod aliquam voluptates repellat enim minus modi dolor, quaerat reprehenderit non nemo, rem temporibus eligendi magni laboriosam architecto autem pariatur ullam esse? </p> <p> This is a placeholder description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, quod aliquam voluptates repellat enim minus modi dolor, quaerat reprehenderit non nemo, rem temporibus eligendi magni laboriosam architecto autem pariatur ullam esse?  </p>",
    img: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    author: "Beka Haile",
    date: "05/05/2023",
    userImg:
      "data:image/jpeg;base64,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",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const blogId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBlog(blogId);
        setBlog(res);
      } catch (err) {
        toast.error("Error Fetching Blog");

        console.log(err);
      }
    };
    fetchData();
  }, [blogId]);

  const handleDelete = async () => {
    console.log("deleting");
    try {
      await deleteBlog(blogId);
      toast.success("Blog Deleted Successfully");

      navigate("/");
    } catch (err) {
      toast.error("Error Deleting blog");

      console.log(err);
    }
  };

  return (
    <DetailContainer>
      <Content>
        <img
          src={
            blog.img
              ? blog.img.includes("http")
                ? blog.img
                : API_URL + "/uploads/" + blog.img
              : ImgPlaceholder
          }
          alt="Blog"
          style={{ objectFit: "cover" }}
        />
        <User>
          <img src={blog.userImg ? blog?.userImg : UserImgPlaceholder} alt="" />
          <div className="info">
            <span>{blog?.author}</span>
            <p>Posted {moment(blog?.date).fromNow()}</p>
          </div>
          {currentUser?.username === blog?.author && (
            <EditContainer>
              <Link to={`/create?edit=${blog.id}`} state={blog}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </EditContainer>
          )}
        </User>
        <h1>{blog?.title}</h1>
        {blog && (
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content),
            }}
          ></p>
        )}
      </Content>
    </DetailContainer>
  );
};

export default BlogDetail;
