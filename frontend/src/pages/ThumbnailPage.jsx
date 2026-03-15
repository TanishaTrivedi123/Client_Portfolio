import React from 'react'
import Thumbnails from "../components/Thumbnails"

const ThumbnailPage = ({images, loading}) => {
  return (
    <>
    <Thumbnails images={images} loading={loading} />
    </>
  )
}

export default ThumbnailPage