// SkeletonVideos.jsx
import React from "react";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";

const SkeletonVideos = () => {
  // Show more skeletons on larger screens
  const skeletonCount = window.innerWidth > 768 ? 8 : 6;

  return (
    <div
      className="relative w-full flex overflow-x-auto no-scrollbar gap-6 md:gap-10 z-10"
      style={{
        paddingLeft: "calc(50vw - 150px)",
        paddingRight: "calc(50vw - 150px)",
      }}
    >
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <Box
          key={index}
          sx={{
            bgcolor: "#000",
            borderRadius: "2rem",
            border: "4px solid #7F5AF0",
            height: { xs: 250, sm: 350, md: 420, lg: 460 },
            minWidth: { xs: 140, sm: 200, md: 250, lg: 280 },
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            boxShadow: "0 0 25px rgba(127, 90, 240, 0.5)",
          }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              background: "linear-gradient(135deg, #1e1b33 0%, #2b2645 100%)",
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
