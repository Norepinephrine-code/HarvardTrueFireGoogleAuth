import React from "react";
import Badge from "@mui/material/Badge";
import CommentIcon from "@mui/icons-material/Comment";
import Zoom from "@mui/material/Zoom";

function ReviewIcon(props) {
  return (
    <div className="col-2 d-flex justify-content-end pe-5">
      <Zoom in={true}>
        <Badge
          badgeContent={props.reviewCount}
          max={99}
          sx={{
            "& .MuiBadge-badge": {
              background: "#1b579bff",
              color: "#fcfcfcff",
            },
          }}
        >
          <CommentIcon />
        </Badge>
      </Zoom>
    </div>
  );
}

export default ReviewIcon;
