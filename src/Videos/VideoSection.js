import { useTheme } from "@emotion/react";
import { Cancel, Close, DoneAll, Work } from "@mui/icons-material";
import {
  Typography,
  Box,
  Paper,
  Button,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import LockedVideo from "./LockedVideo";
import VideoModal from "./VideoModal";
import VideoPlaceholder from "./VideoPlaceholder";

export default function VideoSection(props) {
  const {
    video,
    done,
    unlocked,
    unlockable,
    unlockVideo,
    finishVideo,
    videoToFinish,
    handleClickTracker,
  } = props;

  const { title, id, description, link, thumbnail, quiz } = video;

  const [modalOpen, setModalOpen] = useState(false);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const width = isXs ? 280 : 320;
  const height = isXs ? 157.5 : 180;

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const infoText = () => {
    if (done) {
      return (
        <Tooltip title="Finished Quiz">
          <IconButton color="success">
            <DoneAll />
          </IconButton>
        </Tooltip>
      );
    } else if (unlocked) {
      return (
        <Tooltip title="Finish this video to unlock other videos">
          <IconButton color="secondary">
            <Work />
          </IconButton>
        </Tooltip>
      );
    }
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1, sm: 2 },
          m: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
          <Typography sx={{mr: 1}} variant="h2" align="center">
            {title}
          </Typography>
          {infoText()}
        </Box>
        <Box>
          {unlocked ? (
            <VideoPlaceholder
              handleModalOpen={handleModalOpen}
              thumbnail={thumbnail}
              width={width}
              height={height}
              handleClickTracker={handleClickTracker}
              id={id}
            />
          ) : (
            <LockedVideo
              unlockable={unlockable}
              unlockVideo={unlockVideo}
              videoToFinish={videoToFinish}
              width={width}
              height={height}
              id={id}
              description={description}
              thumbnail={thumbnail}
              handleClickTracker={handleClickTracker}
            />
          )}
        </Box>
      </Paper>
      <VideoModal
        open={modalOpen}
        handleClose={handleModalClose}
        link={link}
        finishVideo={finishVideo}
        infoText={infoText()}
        title={title}
        quiz={quiz}
        handleClickTracker={handleClickTracker}
        id={id}
      />
    </Box>
  );
}
