import React from "react";
import { Link } from "react-router-dom";
import "../styles/notFoundPage.css";

function NotFoundPage() {
  return (
    <div className="not-found-page d-flex flex-column justify-content-center align-items-center">
      <div className="not-found-card text-center p-5 rounded">
        <h1 className="display-4 fw-bold text-danger"><span className="blink">Error 404</span></h1>
        <p className="lead mb-4">Oops! The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="btn btn-outline-light">
          Go back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
