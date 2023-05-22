import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBlogs } from "../../services/getBlogs";
import { Blog } from "../../models/blog";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";

import { Content, Img, Post, PostContainer } from "./home.styles";

import { API_URL, ImgPlaceholder } from "../../constants";

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observer = useRef<any>();

  const lastTrackRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        // check if the last element is visible and increase the offset
        if (entries[0].isIntersecting && hasMore) {
          setOffset((offset) => offset + 3);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const navigate = useNavigate();

  const fetchData = async (offsetCustom?: number) => {
    try {
      setLoading(true);
      const res = await getBlogs(offsetCustom ? offsetCustom : offset);

      if (offset === 0) {
        setBlogs(res);
      } else if (res.length > 0) {
        setBlogs((blogs) => blogs.concat(res));
      } else {
        setHasMore(res.length > 0);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Error fetching blogs");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const openDetail = (id: string) => {
    navigate(`blog/${id}`);
  };

  return (
    <PostContainer>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <Post
            key={blog.id}
            ref={index + 1 === blogs.length ? lastTrackRef : null}
          >
            <Img>
              <img
                src={
                  blog.img
                    ? blog.img.includes("http")
                      ? blog.img
                      : API_URL + "/uploads/" + blog.img
                    : ImgPlaceholder
                }
                alt=""
              />
            </Img>
            <Content>
              <Link className="link" to={`/blog/${blog.id}`}>
                <h1>{blog.title}</h1>
              </Link>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    blog.content
                      ? blog.content.length > 100
                        ? blog.content.substring(0, 100) + "..."
                        : blog.content
                      : ""
                  ),
                }}
              ></p>
              <button onClick={() => (blog.id ? openDetail(blog.id) : null)}>
                Read More
              </button>
            </Content>
          </Post>
        ))
      ) : (
        <h1 style={{ marginInline: "auto" }}>No Blogs Found</h1>
      )}
    </PostContainer>
  );
};

export default Home;
