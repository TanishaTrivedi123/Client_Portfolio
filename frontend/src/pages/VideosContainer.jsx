import React from "react";
import FloatingDots from "../components/shared/FloatingDots";
import VideosHeadingDescription from "../components/videos/VideosHeadingDescription";

import VideoCategoryButtons from "../components/videos/VideoCategoryButtons";
import Videos from "../components/videos/Videos";

const VideosContainer = () => {
  return (
    <>
      <FloatingDots />
      <VideosHeadingDescription />
      <VideoCategoryButtons />
      <Videos />
    </>
  );
};

export default VideosContainer;
