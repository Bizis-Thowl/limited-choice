import { Restore } from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Quiz(props) {
  const {
    question,
    options,
    answerIndex,
    handleAnswered,
    handleRewatch,
    handleClickTracker,
    id
  } = props;

  const [wrong, setWrong] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [disableAll, setDisableAll] = useState(false);

  const handleAnswer = (index) => {
    if (index === answerIndex) {
      handleClickTracker("correct answer " + id)
      setCorrect(true);
      setWrong(false);
      setDisableAll(true);
      setTimeout(() => {
        handleAnswered();
        setDisableAll(false);
      }, 1500);
    } else {
      handleClickTracker("false answer " + id + ": " + index)
      setWrong(true);
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h6">{question}</Typography>
      {wrong && <Typography color="error">Wrong answer</Typography>}
      {correct && (
        <Box sx={{ display: "flex" }}>
          <Typography color="success.main">Correct!</Typography>
          <Restore color="success" />
        </Box>
      )}
      <List sx={{ width: "100%" }}>
        {options.map((v, i) => {
          return (
            <ListItem key={v}>
              <ListItemButton
                disabled={disableAll}
                component={Paper}
                sx={{
                  bgcolor: "secondary.light",
                  borderRadius: 1,
                  "&:hover": { bgcolor: "secondary.main" },
                }}
                onClick={() => handleAnswer(i)}
                key={v}
              >
                {v}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Button disabled={disableAll} onClick={handleRewatch}>
        Rewatch Video
      </Button>
    </Box>
  );
}
