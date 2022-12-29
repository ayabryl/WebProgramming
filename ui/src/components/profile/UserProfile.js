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
import { useEffect } from "react";

const StyledH1 = styled("h1")({
  textAlign: "center",
});

const UserProfile = (props) => {
  const key = "AIzaSyDM0fLUWNTYnSjw1KhsswJRI4QBKxK2OKc";

  const [edit, setEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const idToken = props.idToken;
  let email = props.email;
  const [address, setAddress] = React.useState("");

  const fetchData = async () => {
    // const response = await axios.get('/api/user');
    // setAddress(response.data);
    setAddress("SAGI");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = (event) => {
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
            justifyContent="center"
            rowSpacing={1}
            columnSpacing={1}
          >
            {!edit ? (
              <Grid
                item
                xs={2}
                sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}
              >
                <IconButton onClick={() => setEdit(true)} aria-label="edit">
                  <EditIcon color="primary" />
                </IconButton>
              </Grid>
            ) : null}

            <Grid item xs={12}>
              <StyledH1> My Profile</StyledH1>
            </Grid>
            <Grid item xs={5}>
              <Input size="small" disabled placeholder="**************" />
            </Grid>
            <Grid item xs={5}>
              <Button size="small" disabled={!edit} onClick={handleClickOpen}>
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
                defaultValue={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ mt: 3, display: "flex", justifyContent: "center" }}
            >
              {edit ? (
                <Button
                  variant="outlined"
                  onClick={submitHandler}
                  type="submit"
                  color="primary"
                >
                  Update
                </Button>
              ) : (
                <Grid item xs={12} sx={{ mb: 2, justifyContent: "center" }} />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
};

export default UserProfile;
