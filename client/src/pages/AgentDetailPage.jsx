import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreateReview from "../components/CreateReview";
import { createAgentReviewItem } from "../components/AgentReviewItem";
import SkeletonLoading from "../components/SkeletonLoading";
import "../styles/agentDetailCard.css";

function AgentDetailPage() {
  const { id } = useParams();
  const [agent, setAgent] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [isChange, setIsChange] = React.useState(false);


  React.useEffect(() => {
    async function fetchAgent() {
      try {
        const response = await axios.get(`/api/agent/${id}`);
        setAgent(response.data);
        setIsError(false);
      } catch (err) {
        const errorCode = err.response?.status;
        const message = err.response?.data?.error || "Unknown error";
        setAgent(null);
        setIsError(true);
        setErrorMessage(`Error ${errorCode}: ${message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAgent();
  }, [id, isChange]);

  return (
    <div className="container py-4">
      {isLoading? 
        (
          <h2 className="container">Fetching agent...</h2>
        ) 
        
        : isError? 
        (
          <>
                  <h2 className="container blink text-danger">{errorMessage}</h2>
                  <SkeletonLoading/>
          </>

        ) : // lastCall
        (
          agent && (
            <>
              <div className="d-flex flex-row">
                <div>
                  <h1>{agent.name}</h1>
                </div>
                <div className="ms-auto me-2">
                  <CreateReview 
                    setIsChange={setIsChange} 
                  />
                </div>
              </div>

              <h5 className="ms-2 mt-3">
                <strong>Reviews:</strong>{" "}
                <span className="fw-normal">{agent.reviewCount}</span>
              </h5>

              <div className="mt-4">
                {agent.reviews.length > 0 ? (
                  agent.reviews.map((review, idx) =>
                    createAgentReviewItem(review, idx)
                  )
                ) : (
                  <h2 className="container blink">No reviews yet.</h2>
                )}
              </div>
            </>
          )
        )
      }
    </div>
  );
}

export default AgentDetailPage;
