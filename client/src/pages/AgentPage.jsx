import React from "react";
import axios from "axios";
import SkeletonLoading from "../components/SkeletonLoading";
import AgentCard from "../components/AgentCard";
import agentArray from "../assets/agentArray";
import "../styles/agentPage.css";

export function AgentPage() {
  
  const [inputBuffer, setInputBuffer] = React.useState("");
  const [agentDisplay, setAgentDisplay] = React.useState([]);
  const [agentCache, setAgentCache] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  /*
    Fetch from API /allAgents
    store it then load it in SOURCE OF TRUTH useState
  */

    React.useEffect( () => {
      async function loadAgents() {
        try {
          const response = await axios.get("/api/allAgents");
          const data = response.data; // axios puts JSON response here
          console.log(data);
          setAgentCache(data);        // source of truth
          setAgentDisplay(data);      // visible list

        } catch (err) {

          if (err.response) {
            const errorCodeServer = err.response.status;
            const errorMessageServer = err.response.data.error;
            setErrorMessage(`Error ${errorCodeServer}: ${errorMessageServer}`);
          } else if (err.request) {
            setErrorMessage("Server cannot be reached!");
          } else {
            setErrorMessage("Unexpected error occured!");
          }
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
      loadAgents();
    },[]);


  function handleDisplay(event) {
    const value = event.target.value;
    setInputBuffer(value);

    if (value === "") {
      setAgentDisplay(agentCache);
    } else {
      setAgentDisplay(
        agentCache.filter(agent =>
          agent.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  }

  return (
    <div className="container">
      <div className="d-flex flex-row align-items-center">

        {
          (isLoading===true)? (<h2 className="p-3"> Fetching Agents...</h2>)          :
          (isError===true)  ? (<h2 className="p-3 text-danger">{errorMessage}</h2>)   :
                              (<h2 className="p-3"> Explore Harvard Agents</h2>)
        }

        <input
          type="text"
          className="ms-auto me-3 w-50 h-100"
          placeholder="Search Agent Here"
          name="searchInput"
          value={inputBuffer}
          onChange={(event)=>{handleDisplay(event)}}
        />
      </div>

      {(isLoading===true || isError===true)? (
        <SkeletonLoading />
      ):
      (
        <div>
          {inputBuffer !== "" && agentDisplay.length === 0 ? (
            <h4 className="ms-3 blink">No results found.</h4>
          ) : (
            agentDisplay.map(a => (
              <AgentCard key={a.id} id={a.id} name={a.name} reviewCount={a.reviewCount} />
            ))
          )}
        </div>
      )    
      }

    </div>

  );
}

export default AgentPage;