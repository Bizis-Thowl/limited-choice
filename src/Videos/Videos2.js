import { useMachine } from "@xstate/react";
import { MainMachine } from "../MainMachine";
import VideoSection from "./VideoSection";

export default function Videos2(props) {
  const { videos } = props;

  const [current, send] = useMachine(MainMachine);

  const renderVideoSections = () => {

    const sections = [];

    const notYetViewed = props.videoProgress.find(value => value.unlocked && !value.finished);
    const videoToFinish = notYetViewed ? props.videos.find(val => val.id === notYetViewed.videoId) : null;

    for (let video of props.videos) {
        const done = Boolean(finishedProgresses.find(value => value.videoId === video.id));
        const unlocked = Boolean(unlockedProgresses.find(value => value.videoId === video.id));
        sections.push(
            <VideoSection key={video.id} title={video.title} link={video.link} done={done}
                unlocked={unlocked} unlockable={unlockable} thumbnail={video.thumbnail}
                unlockVideo={() => props.unlockVideo(video.id)} finishVideo={() => props.finishVideo(video.id)}
                videoToFinish={videoToFinish}
            />
        )
    }

    return sections;
}

  return (
    <Box
      sx={{
        m: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper sx={{ maxWidth: "32rem", mb: 4, mt: 4, p: 1 }}>
        <Typography variant="h1" align="center" sx={{ m: 0 }}>
          Übersicht Videos
        </Typography>
      </Paper>
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
