import React from 'react'
import Thumbnails from "../components/Thumbnails"

const ThumbnailPage = ({images, setImages, loading}) => {
  return (
    <>
    <Thumbnails images={images} setImages={setImages} loading={loading} />
    </>
  )
}

export default ThumbnailPage