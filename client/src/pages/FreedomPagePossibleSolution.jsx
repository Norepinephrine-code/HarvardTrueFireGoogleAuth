import React from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import ConfessionItem from "../components/ConfessionItem";
import CreateConfessionFAB from "../components/CreateConfessionFAB";
import "../styles/freedomPage.css";

export default function FreedomPage() {
  
  const DISPLAY_COUNT = 10;
  const [posts, setPosts] = React.useState([]);           // PostsArray
  const [cursor, setCursor] = React.useState(null);       // last id
  const [hasMore, setHasMore] = React.useState(true);     // ifLoad, LoadMore
  const [loading, setLoading] = React.useState(false);    // Loading State


  // observe the LAST rendered card
  const { ref: lastRef, inView } = useInView({
    skip: !hasMore,           // stop observing when there's no more data
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
    
    // Destructure the response
    const {
      items = [],             // if data.items is undefined, default to empty array
      endCursor = null,       // if endCursor is undefined, default to null
      hasMore: more = false,  // Take hasMore and default it to false
    } = data;

    //=======================     UPDATE STATE HOOKS    ==========================//
    setPosts((p) => [...p, ...items]);           // Append the posts
    setCursor(endCursor);                        // Set the Cursor
    setHasMore(more);                            // Update if it has more
  } finally {
    setLoading(false);                            // Done loading
  }
}, [cursor, hasMore, loading]);

  // when the LAST card becomes visible, Fire the loadMore()
  React.useEffect(() => {
    if (inView) loadMore();
  }, [inView, loadMore]);