import React from "react";
import HeadingDescription from "../components/thumbnail/HeadingDescription";
import CategoryButtons from "../components/thumbnail/CategoryButtons";
import FloatingDots from "../components/FloatingDots";
import Thumbnail from "../components/thumbnail/Thumbnail";

const ThumbnailContainer = () => {
  return (
    <>
      <FloatingDots />
      <HeadingDescription />
      <CategoryButtons />
      <Thumbnail />
    </>
  );
};

export default ThumbnailContainer;
