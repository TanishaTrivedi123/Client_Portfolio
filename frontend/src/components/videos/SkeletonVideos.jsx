// SkeletonThumbnail.jsx
import React from "react";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";

const SkeletonVideos = () => {
  const dummyArray = Array.from({ length: 4 }); // Number of thumbnails to load

  return (
    <div
      className="relative flex overflow-x-auto no-scrollbar gap-6 md:gap-10 z-10 px-4 md:px-0"
      style={{
        paddingLeft: "calc(50vw - 100px)",
        paddingRight: "calc(50vw - 100px)",
      }}
    >
      {dummyArray.map((_, index) => (
        <Box
          key={index}
          sx={{
            bgcolor: "#000",
            borderRadius: "2rem",
            border: "4px solid #f6c610",
            height: { xs: 250, sm: 350, md: 420, lg: 460 }, // Phone-style height
            minWidth: { xs: 140, sm: 200, md: 250, lg: 280 }, // Phone-style width
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              bgcolor: "grey.900",
              height: "95%",
              width: "95%",
              borderRadius: "1.5rem",
            }}
          />
        </Box>
      ))}
    </div>
  );
};

export default SkeletonVideos;
