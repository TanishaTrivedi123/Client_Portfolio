import React from "react";
import CategoryButtons from "../components/thumbnail/CategoryButtons";
import FloatingDots from "../components/shared/FloatingDots";
import Thumbnail from "../components/thumbnail/Thumbnail";

const ThumbnailContainer = () => {
  return (
    <>
      <FloatingDots />
      <Thumbnail />
      <CategoryButtons />
    </>
  );
};

export default ThumbnailContainer;
