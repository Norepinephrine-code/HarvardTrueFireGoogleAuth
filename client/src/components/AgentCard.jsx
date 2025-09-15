import React from "react";
import { Container, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../styles/agentCard.css";
import ReviewIcon from "../components/ReviewIcon";

function AgentCard(props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/agents/${props.id}`);  
  }

  return (
    <Container className="my-2" onClick={handleClick} style={{ cursor: "pointer" }}>
      <Card className="card-dark rounded-3">
        <CardBody className="p-3">
          <div className="row align-items-center g-2">
            <div className="col-10 text-start">
              <p className="lead mb-0 text-truncate">{props.name}</p>
            </div>
            <ReviewIcon reviewCount={props.reviewCount} />
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}

export default AgentCard;
