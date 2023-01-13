import { useState, useContext, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Paper,
  Input,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";

import toast, { Toaster } from "react-hot-toast";

import PasswordDialog from "./PasswordDialog";
import { LoginContext } from "../../contexts/LoginContext";

const StyledH1 = styled("h1")({
  textAlign: "center",
});

const UserProfile = (props) => {
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const loggedUserContext = useContext(LoginContext);

  const uid = loggedUserContext.uid;
  const email = loggedUserContext.email;

  const [city, setCity] = useState("");
  const [CommentForDelivery, setCommentForDelivery] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const fetchUserDetails = () => {
    const url = "http://localhost:3001/users/" + uid;
    console.log(url);

    fetch(url)
      .then((res) => {
        res.json().then((data) => {
          setAddressLine(data.address_line);
          setCity(data.city);
          setPhone(data.phone_number);
          setName(data.name);
          setCommentForDelivery(data.comment);
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("Fetching user data...");
    fetchUserDetails();
  }, []);

  const handleChangePasswordClicked = (openPasswordDialog) => {
    setOpen(openPasswordDialog);
  };

  const submitHandler = (event) => {
    const body = {
      _id: uid,
      name: name,
      phone_number: phone,
      city: city,
      address_line: addressLine,
      is_admin: loggedUserContext.isAdmin,
      comment: CommentForDelivery,
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    // Update user details in mongo
    fetch("http://localhost:3001/updateUser", requestOptions)
      .then((response) => {
        toast.success(`Your details updated :)`);
        fetchUserDetails();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Occured, Try again");
      });
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
            ) : (
              <Grid item xs={12} alignSelf="flex-end">
                <IconButton onClick={() => setEdit(false)} aria-label="edit">
                  <CancelIcon color="primary" />
                </IconButton>
              </Grid>
            )}

            <Grid item xs={12}>
              <StyledH1> My Profile</StyledH1>
            </Grid>

            <Grid item xs={6}>
              <TextField
                disabled={!edit}
                id="name"
                label="full name"
                value={name}
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
                value={phone}
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
              <Grid item xs={6}>
                <Input size="small" disabled placeholder="**************" />
              </Grid>
              <Grid item xs={6}>
                <Button
                  size="extara"
                  fontSize="small"
                  disabled={!edit}
                  onClick={() => handleChangePasswordClicked(true)}
                >
                  changing password
                </Button>
              </Grid>
              <Grid item xs={12}>
                <PasswordDialog
                  open={open}
                  handleClose={() => handleChangePasswordClicked(false)}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled
                id="email"
                label="email"
                value={email}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                disabled={!edit}
                id="city"
                label="city"
                value={city}
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
                label="address line"
                value={addressLine}
                onChange={(event) => {
                  setAddressLine(event.target.value);
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                disabled={!edit}
                id="CommentForDelivery"
                label="Comment For Delivery"
                value={CommentForDelivery}
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
