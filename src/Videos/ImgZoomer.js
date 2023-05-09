import { Box, Button, Modal, Paper } from "@mui/material";
import { useState } from "react";

export default function ImgZoomer(props) {
  const { src, alt } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <Box>
      <Button onClick={handleOpen}>Show</Button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
        }}
      >
        <Paper sx={{p: 2, display: "flex", alignItems: "center", justifyContent: "center"}}>
            <img width={500} src={src} alt={alt} />
        </Paper>
      </Modal>
    </Box>
  );
}
