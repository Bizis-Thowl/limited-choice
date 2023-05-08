import { useTheme } from "@emotion/react";
import { Box, Button, Modal, Paper, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import Quiz from "./Quiz";

export default function VideoModal(props) {
  const { open, handleClose, link, finishVideo, infoText, title, id, quiz, handleClickTracker } = props;

  const theme = useTheme();
  const isSuperSmall = useMediaQuery("(max-width:350px)");
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.down("md"));

  const [showQuestion, setShowQuestion] = useState(false);

  const handleQuestionAnswered = () => {
    finishVideo();
    handleModalClose();
  };

  const handleVideoEnded = () => {
    handleClickTracker("ended " + id);
    setShowQuestion(true);
  };

  const handleVideoStarted = () => {
    handleClickTracker("started " + id)
  }

  const handleVideoSkip = () => {
    handleClickTracker("skipped " + id);
    setShowQuestion(true);
  }

  const handleRewatch = (e) => {
    handleClickTracker("rewatch " + id);
    setShowQuestion(false);
  };

  const handleModalClose = () => {
    handleClickTracker("modal close " + id);
    handleClose();
    setShowQuestion(false);
  };

  const getWidthAndHeight = () => {
    if (isSuperSmall) {
      return [300, 168.75];
    } else if (isXs) {
      return [320, 180];
    } else if (isSm) {
      return [480, 270];
    } else {
      return [640, 360];
    }
  };

  const [width, height] = getWidthAndHeight();

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: { xs: 1, sm: 2 },
        }}
      >
        <Typography variant="h2" align="center">
          {title}
        </Typography>
        {infoText}
        {!showQuestion ? (
          <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <ReactPlayer
              url={link}
              controls
              onContextMenu={(e) => e.preventDefault()}
              onEnded={handleVideoEnded}
              onStart={handleVideoStarted}
              width={width}
              height={height}
            />
            <Button onClick={handleVideoSkip} sx={{mt: 1}}>Skip to quiz</Button>
          </Box>
        ) : (
          <Quiz
            question={quiz.question}
            options={quiz.options}
            answerIndex={quiz.answerIndex}
            handleAnswered={handleQuestionAnswered}
            handleRewatch={handleRewatch}
            handleClickTracker={handleClickTracker}
            id={id}
          />
        )}
      </Paper>
    </Modal>
  );
}
