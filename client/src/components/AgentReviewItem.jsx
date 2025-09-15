import React from "react";
import { Card, CardBody } from "reactstrap";

export function AgentReviewItem(props) {
    return (

    <Card key={props.reviewId} className="mb-3 agent-detail-card">
        <CardBody>
        <h5 className="mb-1">{props.username}</h5>
        <small className="d-block mb-2">{props.date}</small>
        <h6 className="fw-bold mb-2">{props.title}</h6>
        <p className="mb-0">{props.content}</p>
        </CardBody>
    </Card>

    );
}

export function createAgentReviewItem(review) {
    return (
        <AgentReviewItem 
            key={review.reviewId}
            username={review.username}
            date={review.created_at}
            title={review.title}
            content={review.content}
        />
    );
}
