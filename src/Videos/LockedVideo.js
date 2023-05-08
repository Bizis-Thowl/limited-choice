import { Lock, LockOpen } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import HelpPopover from "../HelpPopover";

export default function LockedVideo(props) {
  const { id, unlockable, unlockVideo, handleClickTracker } = props;

  const handleUnlocking = (e) => {
    handleClickTracker("unlocked " + id);
    return unlockable && unlockVideo();
  };

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
        marginBottom: 3,
        backgroundColor: "primary.lightest",
        width: props.width,
        height: props.height,
        p: 1,
        position: "relative",
      }}
    >
      <HelpPopover
        info={[props.description]}
        handleClickTracker={() => handleClickTracker("help " + id)}
      />
      {props.unlockable ? (
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <LockOpen color="primary" sx={{ width: "50%", height: "50%" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              alignItems: "center",
            }}
          >
            <img src={props.thumbnail} alt="Video thumbnail" height={100} />
            <Button
              color="secondary"
              variant="contained"
              onClick={handleUnlocking}
              sx={{ mt: 1 }}
            >
              Unlock
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Lock color="secondary" sx={{ width: "20%", height: "20%" }} />
          {props.videoToFinish && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                alignItems: "center"
              }}
            >
              <img src={props.thumbnail} alt="Video thumbnail" height={100} />
              <Typography align="center" sx={{mt: 1}}>
                Watch <b>{props.videoToFinish.title}</b> to be able to unlock
                this video.
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
}
