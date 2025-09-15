import React, { useState } from "react";
import axios from "axios";
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";

import TextField from "@mui/material/TextField";

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import "../styles/createReview.css";
import "../styles/agentPage.css";

import { useParams } from "react-router-dom";
import { WindowSharp } from "@mui/icons-material";

function CreateReview(props) {

  const { id: agentId } = useParams(); 

  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const MAX = 300;
  const MIN = 20;

  function handlePost(event) {
    setContent(event.target.value);

    const {value} = event.target;
    if (value.length === 0) {
        setErrorMessage("");
    } else if (value.length < MIN) {
        setErrorMessage("Too short!");
    } else if (value.length > MAX) {
        let excessCharacter = Math.abs(MAX - value.length);
        (excessCharacter===1?"character":"characters")
        setErrorMessage("Too long! Remove " + excessCharacter + (excessCharacter===1?" character":" characters"));
    } else {
        setErrorMessage("");
    }
    return;
  }

  async function handleSubmit(e) {
     e.preventDefault();
      // Sanitize                        
      const formUsername = username.trim();                         // Gets the username
      const formTitle = title.trim();                               // Gets the title
      const formContent = content.trim();                           // Gets the content
      const created_at = new Date().toISOString().split("T")[0];    // Gets only the date portion

      // Prepare payload
      const payload = {
        username: formUsername,
        title: formTitle,
        content: formContent,
        created_at: created_at
      }

      let response;

      try {
        response = await axios.post(`/api/createReview/${agentId}`, payload);
        if (response.status === 201) {
          alert("Successful Review!");
        } else {
          alert("Failed to create!");
        }
      } catch (err) {
        if (!err.response) return alert("Network error! Check your internet connection!");
        alert(`Error code: ${err.response.status}. ${err.response.data.error}`);
        console.log(err);
      } finally {
        if (response.status === 201) {
          setUsername("");
          setTitle("");
          setContent("");
          setShowForm(false);
          props.setIsChange((prev) => !prev);
        }
      }
  }

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [authError, setAuthError] = React.useState("");

  async function fetchProtectedRoute() {
    try {
      const res = await axios.get('/api/me', { withCredentials: true });
      setIsAuthenticated(true);
      setAuthError("");
      return true;
    } catch (error) {
      const errCode = error.response.status;
      const msg = error?.response?.data?.error || 'Unexpected error occured';
      console.error(`Error ${errCode}: ${msg}`);
      setIsAuthenticated(false);
      setAuthError(msg);
      return false;
    }
  }

  async function handleShowForm() {
    const ok = await fetchProtectedRoute();
    if (ok) {
      setShowForm(true);
    } else {
      setShowForm(false);
      window.openNotif("Click this to Sign in with Google to leave a review", "info", "", "/api/auth/google");
    }
  }


  return (
    <div>
      <IconButton
        className="create-review-button"
        onClick={() => handleShowForm()}
        sx={{
          backgroundColor: "#1e1e1e",
          color: "#fff",
          "&:hover": { backgroundColor: "#333" }
        }}
      >
        <CreateIcon />
      </IconButton>

      {showForm && (
        <div className="review-overlay" onClick={() => setShowForm(false)}>
            <form onSubmit={(e)=>{handleSubmit(e)}} className="review-form d-flex flex-column" onClick={(e) => e.stopPropagation()}>
                <h1 className="mb-3">Create Review</h1>
                <TextField 
                    label="Username" 
                    variant="outlined" 
                    margin="normal" 
                    value={username}
                    onChange={(event)=>setUsername(event.target.value)}
                    fullWidth required 
                />

                <TextField 
                    label="Title" 
                    variant="outlined" 
                    margin="normal" 
                    value={title}
                    onChange={(event)=>setTitle(event.target.value)}
                    fullWidth required 
                />

                <TextField
                    label="Content"
                    variant="outlined"
                    margin="normal"
                    value={content}
                    onChange={(event)=>{handlePost(event)}}
                    fullWidth multiline rows={4} required
                />

                <div className="review-form-buttons d-flex flex-row align-items-center">

                    {errorMessage===""?"":(
                        <p className="mb-0 me-3 blinkInputError">{errorMessage}</p>
                    )}

                    {username===""?(
                        <p className="mb-0 me-3 blinkInputError">Anonymous username required!</p>
                    ):""}

                    
                    {(title==="" && username !=="")?(
                        <p className="mb-0 me-3 blinkInputError">Title required!</p>
                    ):""}

                    {(content==="" && title!=="" && username !=="") ?(
                        <p className="mb-0 me-3 blinkInputError">Content required!</p>
                    ):""}

                    <Button className="cancel-button" variant="outlined" startIcon={<DeleteIcon />} 
                      onClick={()=>{setShowForm(false)}}
                      type="reset"
                      >
                        Cancel
                    </Button>
                    <Button className ="create-button" variant="contained" endIcon={<SendIcon />} 
                      disabled={errorMessage !== "" || username === "" || title === "" || content ===""} 
                      type="submit"
                    >
                        Create
                    </Button>
                </div>
            </form>
        </div>
      )}
    </div>
  );
}

export default CreateReview;
