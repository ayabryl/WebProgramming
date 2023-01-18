import AuthForm from "../components/Auth/AuthForm";
import Grid from "@mui/material/Grid";

const AuthPage = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 1.5 }}
    >
      <AuthForm />
    </Grid>
  );
};

export default AuthPage;
