import React, { useState,useEffect } from 'react'

const VideoPlayer = () => {
    const [courseId,setCourseId]=useState("");
    useEffect(()=>{
        const queryParams = new URLSearchParams(window.location.search);
        const cid = queryParams.get('courseId');
        setCourseId(cid);
    },[])
  return (
    <div>
      <video src={`http://lmspwc.eastus.cloudapp.azure.com:5000/courses/courseVideo/${courseId}_video`} controls style={{ width: '100%', height: 'auto' }} />
    </div>
  )
}

export default VideoPlayer

