import React from 'react'
import Videos from '../components/Videos'

const VideoPage = ({videos, loading}) => {
  return (
    <>
    <Videos videos={videos} loading={loading} />
    </>
  )
}

export default VideoPage