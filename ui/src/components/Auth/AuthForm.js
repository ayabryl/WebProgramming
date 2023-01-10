import { useState, useRef } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { useContext } from "react";
import Context from "@mui/base/TabsUnstyled/TabsContext";

const useLoginContext = () => {
  const context = useContext(LoginContext);
  return context;
};

const StyledH1 = styled("h1")({
  textAlign: "center",
});

const AuthForm = () => {
  const key = "AIzaSyDM0fLUWNTYnSjw1KhsswJRI4QBKxK2OKc";
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const navigate = useNavigate();

  // const { login } = useLoginContext();
  const { email, uid, login } = useContext(LoginContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const validate = (email, password) => {
    // Validate email
    if (!email) {
      setEmailError(true);
      setEmailHelperText("Email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError(true);
      setEmailHelperText("Invalid email address");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }

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

    if (emailError || passwordError) {
      return false;
    } else {
      return true;
    }
  };

  const CreateNewUserInMongo = (id) => {
    const body = {
      _id: id,
      name: "",
      phone_number: "",
      city: "",
      address_line: "",
      is_admin: false,
      comment: "",
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    // Save the new user in mongo (with the firebase id)
    fetch("http://localhost:3001/addUser", requestOptions)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Occured, Try again");
      });
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (validate(enteredEmail, enteredPassword)) {
      setIsLoading(true);

      const url = isLogin
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
      // let email = enteredEmail;
      let localId;

      // if (isLogin) {
      //   url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
      // } else {
      //   url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
      // }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
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
              let errorMessage = `Auth failed: ${data.error.message}`;

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
          if (!isLogin) {
            CreateNewUserInMongo(data.localId);
          }
          toast.success(`Successfull ${isLogin ? "Login" : "Sign Up"} !`);
          // console.log(email);
          login(data.email, data.localId, data.isAdmin);

          navigate("/", { replace: true });
        })
        .then(() => {
          console.log(email, localId);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          "& > :not(style)": {
            m: 1,
            width: 350,
            height: 420,
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
          >
            <form onSubmit={submitHandler}>
              <Grid item xs={12}>
                <StyledH1>{isLogin ? "Login" : "Sign Up"}</StyledH1>
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  label="Email"
                  type="email"
                  error={emailError}
                  helperText={emailHelperText}
                  inputRef={emailInputRef}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 4 }}>
                <TextField
                  label="Password"
                  type="password"
                  inputRef={passwordInputRef}
                  error={passwordError}
                  helperText={passwordHelperText}
                />
              </Grid>

              {!isLoading && (
                <Grid
                  item
                  xs={12}
                  sx={{ mb: 2, display: "flex", justifyContent: "center" }}
                >
                  <Button type="submit" variant="contained" color="primary">
                    {isLogin ? "Login" : "Create Account"}
                  </Button>
                </Grid>
              )}
              {isLoading && (
                <Grid item xs={12}>
                  <p> Loading ... </p>{" "}
                </Grid>
              )}
              <Grid
                item
                xs={12}
                sx={{ mb: 2, display: "flex", justifyContent: "center" }}
              >
                <Button
                  onClick={switchAuthModeHandler}
                  type="submit"
                  variant="outlined"
                  color="primary"
                >
                  {isLogin
                    ? "Create new account"
                    : "Login with existing account"}
                </Button>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default AuthForm;
