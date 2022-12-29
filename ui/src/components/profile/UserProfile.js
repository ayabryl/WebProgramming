import * as React from "react";
import Button from "@mui/material/Button";
import { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import toast, { Toaster } from "react-hot-toast";
import PasswordDialog from "./PasswordDialog";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const StyledH1 = styled("h1")({
  textAlign: "center",
});

const UserProfile = (props) => {
  const key = "AIzaSyDM0fLUWNTYnSjw1KhsswJRI4QBKxK2OKc";

  const [edit, setEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const idToken = props.idToken;
  const email = props.email;
  const addressRef = useRef(props.address !== undefined ? props.address : "");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = addressRef.current.value;

    // TODO: send the new address to the server
    toast.success(`Updated`);
    setEdit(false);
  };

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Box
        sx={{
          display: "flex",
          "& > :not(style)": {
            m: 1,
            width: 500,
            height: 350,
          },
        }}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <Paper elevation={3}>
          <Grid
            sx={{ mt: 2 }}
            container
            alignItems="center"
            justifyContent="center"
            rowSpacing={1}
            columnSpacing={1}
          >
            {!edit ? (
              <div>
                <Grid item xs={7}>
                  {" "}
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => setEdit(true)} aria-label="edit">
                    <EditIcon color="primary" />
                  </IconButton>
                </Grid>
              </div>
            ) : (
              <Grid item xs={12} />
            )}

            <Grid item xs={12}>
              <StyledH1> My Profile</StyledH1>
            </Grid>
            <Grid item xs={5}>
              <Input size="small" disabled placeholder="**************" />
            </Grid>
            <Grid item xs={5}>
              <Button
                size="small"
                disabled={!edit}
                variant="outlined"
                onClick={handleClickOpen}
              >
                changing password
              </Button>
            </Grid>
            <Grid item xs={12}>
              <PasswordDialog open={open} handleClose={handleClose} />
            </Grid>
            <Grid item xs={5}>
              <TextField
                disabled
                id="email"
                label="email"
                defaultValue={email}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                disabled={!edit}
                id="address"
                label="address"
                inputRef={addressRef}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={6} sx={{ mb: 2, justifyContent: "center" }}>
              {edit ? (
                <Button
                  onClick={submitHandler}
                  type="submit"
                  variant="filled"
                  color="primary"
                >
                  Update
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
};

export default UserProfile;
