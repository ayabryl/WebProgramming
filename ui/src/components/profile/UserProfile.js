import * as React from "react";
import Button from "@mui/material/Button";
import { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import toast, { Toaster } from "react-hot-toast";
import PasswordDialog from "./PasswordDialog";
import Grid from "@mui/material/Grid";

const UserProfile = (props) => {
  const key = "AIzaSyDM0fLUWNTYnSjw1KhsswJRI4QBKxK2OKc";

  const [open, setOpen] = React.useState(false);
  const idToken = props.idToken;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Button variant="outlined" onClick={handleClickOpen}>
        changing password
      </Button>
      <PasswordDialog open={open} handleClose={handleClose} />
    </Grid>
  );
};

export default UserProfile;
