import { useEffect, useState } from "react";
import Videos from "./Videos/Videos";
import { Paper } from "@mui/material";
import { videos } from "./data/videos";
import useClickTracker from "./CustomHooks/useClickTracker";
import {v4 as uuidv4} from 'uuid';
import CopyToClipboardText from "./Videos/CopyToClipboardText";
import uploadClicks from "./uploadClicks";
import { shuffleArray } from "./utils/shuffleArray";

function App() {

  let user;

  if (localStorage.getItem("user")) {
    user = localStorage.getItem("user")
  } else {
    user = uuidv4()
    localStorage.setItem("user", user);
  }

  let shuffledVideos;

  if (localStorage.getItem("videos")) {
    shuffledVideos = JSON.parse(localStorage.getItem("videos"))
  } else {
    shuffledVideos = shuffleArray(videos);
    localStorage.setItem("videos", JSON.stringify(shuffledVideos));
  }
  
  const [videoProgress, setVideoProgress] = useState(localStorage.getItem("videoProgress") ? JSON.parse(localStorage.getItem("videoProgress")) : []);
  const {clicks, handleClickTracker} = useClickTracker(localStorage.getItem("clickTracker") ? JSON.parse(localStorage.getItem("clickTracker")) : []);

  useEffect(() => {
    localStorage.setItem("clickTracker", JSON.stringify(clicks))
    uploadClicks(clicks, user);
  }, [clicks])

  useEffect(() => {
    localStorage.setItem("videoProgress", JSON.stringify(videoProgress))
  }, [videoProgress])

  const updateVideoFinished = (videoId) => {
    const video = shuffledVideos.find((v) => videoId === v.id);
    let updatedProgress = handleProgress(videoProgress, video, "finish");
    setVideoProgress(updatedProgress);
  };

  const updateVideoUnlocked = (videoId) => {
    const video = shuffledVideos.find((v) => videoId === v.id);
    const updatedProgress = handleProgress(videoProgress, video, "unlock");
    setVideoProgress(updatedProgress);
  };

  const handleProgress = (progress, video, type) => {
    let indexIfPresent = progress.findIndex((v) => v.id === video.id);
    if (indexIfPresent !== -1) {
      return progress.map((v,i) => {
          if (i !== indexIfPresent) return v;
          else {
            if (type === "unlock") {
              return {...v, unlocked: true}
            } else if (type === "finish") {
              return {...v, finished: true}
            }
            return v;
          }
      })
    } else {
      return [
        ...progress,
        {
          id: video.id,
          unlocked: true,
          finished: false,
        },
      ];
    }
  };

  return (
    <Paper sx={{ p: 1, m: 2, position: "relative" }}>
      <CopyToClipboardText text={user}/>
      <Videos
        videoProgress={videoProgress}
        unlockVideo={updateVideoUnlocked}
        videos={shuffledVideos}
        finishVideo={updateVideoFinished}
        handleClickTracker={handleClickTracker}
      />
    </Paper>
  );
}

export default App;
