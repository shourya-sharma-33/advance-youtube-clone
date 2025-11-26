import React from 'react'

interface PageProps {
    params : Promise<{videoId : string}>
}

const VideoId = async ({params} : PageProps) => {
    const {videoId} = await params;
  return (
    <div>VideoId : {videoId}</div>
  )
}

export default VideoId