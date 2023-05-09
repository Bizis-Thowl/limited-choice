import { Box, Typography, Paper, IconButton } from "@mui/material";
import React, { useState } from "react";
import VideoSection from "./VideoSection";
import { Close, InfoOutlined } from "@mui/icons-material";
import LoopImage from "../assets/planning-loops.jpeg";
import ImgZoomer from "./ImgZoomer";

export default function Videos(props) {
  const {
    videoProgress,
    unlockVideo,
    videos,
    finishVideo,
    handleClickTracker,
  } = props;

  const [showTip, setShowTip] = useState(true);

  const finishedProgresses = videoProgress.filter((value) => value.finished);
  const unlockedProgresses = videoProgress.filter((value) => value.unlocked);
  const allUnlocked = finishedProgresses.length === videos.length;
  const unlockable =
    finishedProgresses.length === unlockedProgresses.length && !allUnlocked;

  const renderVideoSections = () => {
    const sections = [];

    const notYetViewed = videoProgress.find(
      (value) => value.unlocked && !value.finished
    );
    const videoToFinish = notYetViewed
      ? videos.find((val) => val.id === notYetViewed.id)
      : null;

    for (let video of videos) {
      const done = Boolean(
        finishedProgresses.find((value) => value.id === video.id)
      );
      const unlocked = Boolean(
        unlockedProgresses.find((value) => value.id === video.id)
      );
      sections.push(
        <VideoSection
          key={video.id}
          done={done}
          unlocked={unlocked}
          unlockable={unlockable}
          unlockVideo={() => unlockVideo(video.id)}
          finishVideo={() => finishVideo(video.id)}
          videoToFinish={videoToFinish}
          video={video}
          handleClickTracker={handleClickTracker}
        />
      );
    }

    return sections;
  };

  const closeTip = (e) => {
    handleClickTracker("close tip");
    setShowTip(false);
  };

  return (
    <Box
      sx={{
        m: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" align="center" sx={{ m: 0 }}>
        Extreme Programming (XP)
      </Typography>
      {unlockable && showTip && (
        <Paper
          sx={{
            p: 2,
            mt: 1,
            maxWidth: 500,
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <InfoOutlined sx={{ m: 2 }} />
          <Typography>
            Unlocking a video will cause all other videos to be unlocked until
            you finished the video and answered its corresponding questions
          </Typography>
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={closeTip}
          >
            <Close />
          </IconButton>
        </Paper>
      )}
      {allUnlocked && (
        <Paper
          sx={{
            p: 2,
            mt: 1,
            bgcolor: "secondary.lighter",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Typography variant="h3" sx={{ fontWeight: 500 }}>
              Great!
            </Typography>
            <Typography variant="h3">
              You have answered all quiz questions and displayed a basic
              understanding about XP.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography>
              Here is an overview of the Planning/Feedback Loops in XP:
            </Typography>
            <ImgZoomer src={LoopImage} alt="XP Planning/Feedback Loops" />
          </Box>
        </Paper>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {renderVideoSections()}
      </Box>
    </Box>
  );
}
