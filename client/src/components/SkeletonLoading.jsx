import React from "react";
import { Skeleton } from "@mui/material";

function SkeletonLoading() {
  return (
    <div className="container">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton
          key={i}
          animation="wave"
          height={70} // bigger height (50px)
          sx={{
            bgcolor: "#1f1f1fff", // dark gray background
          }}
        />
      ))}
    </div>
  );
}

export default SkeletonLoading;
