import { useState, useRef } from "react";
import {
  Button,
  TextField,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material/";

import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const PasswordDialog = (props) => {
  const open = props.open;
  const handleClose = props.handleClose;

  const key = "AIzaSyDM0fLUWNTYnSjw1KhsswJRI4QBKxK2OKc";
  const passwordInputRef = useRef(null);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const idToken = Cookies.get("idToken");

  const validate = (password) => {
    // Validate password
    if (!password) {
      setPasswordError(true);
      setPasswordHelperText("Password is required");
    } else if (password.length < 8) {
      setPasswordError(true);
      setPasswordHelperText("Password must be at least 8 characters long");
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }

    console.log(idToken);

    if (passwordError) {
      return false;
    } else {
      return true;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;

    if (validate(enteredPassword)) {
      setIsLoading(true);

      let url;

      url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${key}`;
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: Cookies.get("idToken"),
          password: enteredPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = `Changing Password failed: ${data.error.message}`;

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          //ToDo: save the user to the page and exit from this page
          toast.success(`Successfully changed!`);
          console.log("dcd");
          handleClose();
          console.log(data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Password"
            autoFocus
            type="password"
            margin="dense"
            variant="standard"
            fullWidth
            inputRef={passwordInputRef}
            error={passwordError}
            helperText={passwordHelperText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitHandler}>Change</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PasswordDialog;
