import React, { useContext, useEffect, useState } from "react";
import "./singlePost.css";
import { useLocation } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/post/" + path);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setPost(res.data);
    };

    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete("/post/" + path, { userName: user.userName });
      window.location.replace("/");
    } catch (err) {
      console.log("cannot delete");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put("/post/" + post._id, {
        userName: user.userName,
        title,
        desc,
      });
      // window.location.reload();
      setUpdateMode(false);
    } catch (err) {
      console.log("cannot update");
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}

        {updateMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="singlePostTitleInput"
            autoFocus
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.userName === user?.userName && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.userName}`} className="link">
              <b>{post.userName}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="singlePostDescInput"
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}

        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
