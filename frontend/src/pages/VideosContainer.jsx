import React from "react";
import FloatingDots from "../components/shared/FloatingDots";
import VideoCategoryButtons from "../components/videos/VideoCategoryButtons";
import Videos from "../components/videos/Videos";

const VideosContainer = () => {
  return (
    <>
      <FloatingDots />
      <Videos />
      <VideoCategoryButtons />
    </>
  );
};

export default VideosContainer;
