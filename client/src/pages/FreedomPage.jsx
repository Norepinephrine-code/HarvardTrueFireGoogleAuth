import React from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import ConfessionItem from "../components/ConfessionItem";
import CreateConfessionFAB from "../components/CreateConfessionFAB";
import "../styles/freedomPage.css";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Button from "@mui/material/Button";
import TrendingPosts from "../assets/trendingPosts";

export function FreedomPage() {

  const DISPLAY_COUNT = 10;

  const [initialLoading, setInitialLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);           // PostsArray
  const [cursor, setCursor] = React.useState(null);       // last id
  const [hasMore, setHasMore] = React.useState(true);     // ifLoad, LoadMore
  const [loading, setLoading] = React.useState(false);    // Loading State

  // make the scrollable column the IntersectionObserver root
   const [rootEl, setRootEl] = React.useState(null);

  const { ref: sentinelRef, inView } = useInView({
    root: rootEl ?? undefined,
    rootMargin: "0px 0px",
    threshold: 0,
    skip: !rootEl || !hasMore || loading,         // Skip if there is no, if there is no, if it is loading.
  });

  // Load initially
  React.useEffect(() => {
    loadMore();
  }, []);


  const loadMore = React.useCallback(async () => {
    if (loading || !hasMore) return;                // If its already loading or it has no more, abort.
   
    setLoading(true);                               // Block temporarily
    try {
      const params = { 
                        limit: DISPLAY_COUNT, 
                        cursor: cursor ?? undefined 
                      };
      const response = await axios.get("/api/posts", { params });
      const data = response.data;
      console.log(data);
      // Destructure the response
      const {
        items = [],             // if data.items is undefined, default to empty array
        endCursor = null,       // if endCursor is undefined, default to null
        hasMore: more = false,  // Take hasMore, rename to more and default it to false
      } = data;

      //=======================     UPDATE STATE HOOKS    ==========================//
      setPosts((p) => [...p, ...items]);           // Append the posts
      setCursor(endCursor);                        // Set the Cursor
      setHasMore(more);                            // Update if it has more
    } finally {
      setLoading(false);                            // Done loading
      setInitialLoading(false); 
    }
  }, [cursor, hasMore, loading]);

  // when the LAST card becomes visible, Fire the loadMore()
  const firedRef = React.useRef(false);
  React.useEffect(() => {
    if (inView) {
      if (!firedRef.current && !loading && hasMore) {
        firedRef.current = true;
        loadMore();
      }
    } else {                                      // Reset only when inView === false
      firedRef.current = false;
    }
  }, [inView, loading, hasMore, loadMore]);

  return (
    
    <div className="freedom-page">
      <div className="container-fluid d-flex flex-column h-100 px-0 mx-0">
        <div className="row g-0 h-100 freedom-row"> 
          {/* Big column */}
          <div
            className="col-12 col-md-9 mx-0 px-0 h-100"
            style={{ minHeight: 0, overflowY: "auto" }}
            ref={setRootEl}
          >
            
            <h1 className="sticky-top d-flex justify-content-between align-items-center">
              {
                (initialLoading)  
                ? (<span>Fetching posts...</span>)
                : (<span>Most Recent</span>)
              }

              {/* DISPLAY:  Trigger on md onwards*/}
              <span className="me-4 my-2 d-none d-md-block">
                <CreateConfessionFAB label="Create Confession" />
              </span>

              {/* DISPLAY:  Disappear on md onwards*/}
              <span className="me-4 my-2 d-block d-md-none">
                <CreateConfessionFAB label={null} />
              </span>

            </h1>


            <ul className="mt-0 pt-0">
              {posts.map((confessionItem) => (
                  <div key={confessionItem.id}>
                    <ConfessionItem
                      key={confessionItem.id}
                      id={confessionItem.id}
                      title={confessionItem.title}
                      content={confessionItem.content}
                      author={confessionItem.author}
                      date={confessionItem.date}
                    />
                  </div>
                ))
              }

              {
                (hasMore) ? 
                (<div ref={sentinelRef} style={{ height: 10 }} />) : 
                (<h3 className="container d-flex justify-content-center blink">There is no more...</h3>)
              }
              
            </ul>
          </div>

          {/* Small column */}
          <div
            className="d-none d-md-block col-md-3 mx-0 px-0 h-100"
            style={{ minHeight: 0, overflowY: "auto" }}
          >
            <h1 className="sticky-top">Controversials</h1>
            <ul>
              {TrendingPosts.map((confessionItem) => (
                <ConfessionItem
                  key={confessionItem.id}
                  id={confessionItem.id}
                  title={confessionItem.title}
                  author={confessionItem.author}
                  date={confessionItem.date}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
}

export default FreedomPage;
