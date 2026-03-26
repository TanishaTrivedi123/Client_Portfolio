import React from 'react'
import Videos from '../components/Videos'

const VideoPage = ({videos, setVideos, loading}) => {
  return (
    <>
    <Videos videos={videos} setVideos={setVideos} loading={loading} />
    </>
  )
}

export default VideoPage