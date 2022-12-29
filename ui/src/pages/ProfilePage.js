import UserProfile from "../components/profile/UserProfile";
import Grid from "@mui/material/Grid";
import { useState, useRef } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";

const profilePage = () => {
  let idToken = undefined;

  return (
    <Grid container alignItems="center" justifyContent="center">
      <UserProfile idToken={idToken} email="sagi" />
    </Grid>
  );
};

export default profilePage;
