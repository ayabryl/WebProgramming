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
import Cookies from "js-cookie";

const StyledH1 = styled("h1")({
  textAlign: "center",
});

const UserProfile = (props) => {
  const key = "AIzaSyDM0fLUWNTYnSjw1KhsswJRI4QBKxK2OKc";

  const [edit, setEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const idToken = Cookies.get("idToken");
  const email = Cookies.get("email");

  const [city, setCity] = React.useState("");
  const [CommentForDelivery, setCommentForDelivery] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const fetchData = () => {
    // const response = await axios.get('/api/user');
    // setAddress(response.data);
  };

  useEffect(() => {
    console.log("Fetching data...");
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
            m: 2,
            width: "45%",
            height: "110%",
          },
          justifyContent: "center",
        }}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <Paper elevation={3}>
          <Grid
            sx={{ mt: 1, ml: 4 }}
            container
            justifyContent="center"
            rowSpacing={1}
          >
            {!edit ? (
              <Grid item xs={12} alignSelf="flex-end">
                <IconButton onClick={() => setEdit(true)} aria-label="edit">
                  <EditIcon color="primary" />
                </IconButton>
              </Grid>
            ) : null}

            <Grid item xs={12}>
              <StyledH1> My Profile</StyledH1>
            </Grid>

            <Grid item xs={6}>
              <TextField
                disabled={!edit}
                id="name"
                label="full name"
                defaultValue={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                disabled={!edit}
                id="phone"
                label="phone number"
                defaultValue={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                variant="outlined"
              />
            </Grid>

            <Grid
              container
              item
              xs={12}
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Grid item xs={5}>
                <Input size="small" disabled placeholder="**************" />
              </Grid>
              <Grid item xs={5}>
                <Button
                  size="extara"
                  fontSize="small"
                  disabled={!edit}
                  onClick={handleClickOpen}
                >
                  changing password
                </Button>
              </Grid>
              <Grid item xs={12}>
                <PasswordDialog open={open} handleClose={handleClose} />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled
                id="email"
                label="email"
                defaultValue={Cookies.get("email")}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                disabled={!edit}
                id="city"
                label="city"
                defaultValue={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                disabled={!edit}
                id="address"
                label="address"
                defaultValue={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                disabled={!edit}
                id="CommentForDelivery"
                label="Comment For Delivery"
                defaultValue={CommentForDelivery}
                onChange={(event) => {
                  setCommentForDelivery(event.target.value);
                }}
                variant="outlined"
                rows={3}
                multiline
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ mb: 2, mt: 3, display: "flex", justifyContent: "center" }}
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
                <Grid
                  item
                  xs={12}
                  sx={{ mb: 2, mt: 3, justifyContent: "center" }}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
};

export default UserProfile;
