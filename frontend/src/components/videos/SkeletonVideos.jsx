// SkeletonVideos.jsx
import React from "react";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";

const SkeletonVideos = () => {
  const dummyArray = Array.from({ length: 6 }); // Number of thumbnails to load

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
            bgcolor: "#000", // background behind skeleton
            borderRadius: "2rem",
            border: "4px solid #7F5AF0", // new purple-blue border
            height: { xs: 250, sm: 350, md: 420, lg: 460 },
            minWidth: { xs: 140, sm: 200, md: 250, lg: 280 },
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
              bgcolor: "bg-gradient-to-br from-[#1e1b33] to-[#2b2645]",
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
