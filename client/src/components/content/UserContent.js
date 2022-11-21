import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const UserContent = ({ handleDelete, title, desc, img, id }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteItem = (id) => {
    handleDelete(id);
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: "auto",
        width: 300,
        height: 350,
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Card>
        <CardMedia
          component="img"
          height="140"
          width="260"
          src={img}
          alt="content_image"
        />
        <CardContent sx={{ justifySelf: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleOpen} size="small">
            <Delete />
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete Content?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action can't be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Go Back</Button>
              <Button onClick={() => deleteItem(id)} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserContent;
