import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/confessionItem.css";

function ConfessionItem(props) {

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/posts/${props.id}`);  
  }

  return (
    <li className="confession-item"
        onClick={()=>{handleClick()}}
    >
      <h2>{props.title}</h2>
      <small>{props.date}</small>
      <p>{props.content}</p>
      <small>By: {props.author}</small>
    </li>
  );
}

export default ConfessionItem;
