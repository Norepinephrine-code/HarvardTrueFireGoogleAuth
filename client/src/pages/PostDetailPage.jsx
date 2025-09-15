import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import PostArray from "../assets/postsArray";
import "../styles/postDetailPage.css";

function PostDetailPage() {
  const { id:postId } = useParams();
  const [post, setPost] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  async function fetchPostById() {
    try {
        const response = await axios.get(`/api/post/${postId}`);
        setPost(response.data);
    } catch (err) {
        if (!err.response) {
            setErrorMessage("Network Error! Check Internet connection!");
            setPost(null);
        }
        setErrorMessage(`Error ${err.response.status}: ${err.response.data.error}`);
        setPost(null);
    } finally {
        setIsLoading(false);
    }
  }

  
  useEffect(()=>{
    fetchPostById();
  }, []);

  if (isLoading===true) {
    return (
        <div className="d-flex min-vh-100 align-items-center justify-content-center">
            <CircularProgress />
            <h2 className="mb-0">Fetching Post...</h2>
        </div>
    );
  }

  if (post===null) {
    return (
        <div className="d-flex min-vh-100 align-items-center justify-content-center">
            <h2 className="blink text-danger mb-0">{errorMessage}</h2>
        </div>
    );
  }

  return (
    <div className="container py-4 d-flex flex-column justify-content-center align-items-center min-vh-100">
        <Card className="post-detail-card bg-dark text-light">
            <CardBody>
            <h1 className="mb-3 ms-0 ps-0">{post.title}</h1>
            <small className="text-secondary d-block mb-3">
                {new Date(post.date).toLocaleString()} • By {post.author}
            </small>
            <p className="fs-5">{post.content}</p>
            </CardBody>
        </Card>
        <div className="mt-3 d-flex justify-content-center">
            <Link to="/freedomWall" className="btn btn-outline-light">
                Go back Home
            </Link>
        </div>
    </div>
  );
}

export default PostDetailPage;
