import React, { useState } from "react";
import axios from "axios";
import { createPortal } from "react-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import "../styles/createReview.css"; // uses .review-overlay / .review-form / .review-form-buttons
import "../styles/agentPage.css";

function CreateConfessionButton(props) {
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const MAX = 1000;
  const MIN = 10;

  function handlePost(event) {
    const { value } = event.target;
    setContent(value);

    if (value.length === 0) {
      setErrorMessage("");
    } else if (value.length < MIN) {
      setErrorMessage("Too short!");
    } else if (value.length > MAX) {
      const excessCharacter = Math.abs(MAX - value.length);
      setErrorMessage(
        "Too long! Remove " +
          excessCharacter +
          (excessCharacter === 1 ? " character" : " characters")
      );
    } else {
      setErrorMessage("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formUsername = username.trim();
    const formTitle = title.trim();
    const formContent = content.trim();
    const date = new Date().toISOString();

    const payload = {
      title: formTitle,
      content: formContent,
      author: formUsername,
      date,
    };

    let response;
    try {
      response = await axios.post("/api/posts", payload);
      if (response.status === 201) {
        alert("Successful Confession!");
      } else {
        alert("Failed to create!");
      }
    } catch (err) {
      if (!err.response) return alert("Network error! Check your internet connection!");
      alert(
        `Error code: ${err.response.status}. ${err.response.data?.error ?? "Request failed"}`
      );
      console.log(err);
    } finally {
      if (response?.status === 201) {
        setUsername("");
        setTitle("");
        setContent("");
        setShowForm(false);
      }
    }
  }

  const overlay = (
    <div className="review-overlay" onClick={() => setShowForm(false)}>
      <form
        className="review-form d-flex flex-column"
        autoComplete="off"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()} // don't close when clicking inside form
      >
        <h1 className="mb-3">Create Confession</h1>

        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
          fullWidth
          required
        />
        <TextField
          label="Title"
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoComplete="off"
          fullWidth
          required
        />
        <TextField
          label="Content"
          variant="outlined"
          margin="normal"
          value={content}
          onChange={handlePost}
          autoComplete="off"
          fullWidth
          multiline
          rows={4}
          required
        />

        <div className="review-form-buttons d-flex flex-row align-items-center">
          {errorMessage !== "" && (
            <p className="mb-0 me-3 blinkInputError">{errorMessage}</p>
          )}

          {username === "" ? (
            <p className="mb-0 me-3 blinkInputError">Anonymous username required!</p>
          ) : (
            ""
          )}

          {title === "" && username !== "" ? (
            <p className="mb-0 me-3 blinkInputError">Title required!</p>
          ) : (
            ""
          )}

          {content === "" && title !== "" && username !== "" ? (
            <p className="mb-0 me-3 blinkInputError">Content required!</p>
          ) : (
            ""
          )}

          <Button
            className="cancel-button"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => setShowForm(false)}
            type="reset"
          >
            Cancel
          </Button>
          <Button
            className="create-button"
            variant="contained"
            endIcon={<SendIcon />}
            disabled={
              errorMessage !== "" || username === "" || title === "" || content === ""
            }
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      {/* Trigger button */}
      <Button
        variant="contained"
        startIcon={props.label !== null ? <AddIcon /> : null}
        onClick={() => setShowForm(true)}
        sx={{
          backgroundColor: "#1e1e1e",
          color: "#fff",
          "&:hover": { backgroundColor: "#333" },
        }}
      >
        {props.label !== null ? props.label : <AddIcon />}
      </Button>

      {/* Portaled overlay (renders at document.body) */}
      {showForm && createPortal(overlay, document.body)}
    </div>
  );
}

export default CreateConfessionButton;
