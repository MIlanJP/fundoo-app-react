import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import styles from "../scss/login.module.scss";
import "../css/logo.css";
import { Link, useHistory } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Auth from "../services/Auth";
import services from "../services/services";
import MessageContext from "../components/messagecontext";
import Logo from "../components/Logo";

export default function Login(props) {
  const message1 = useContext(MessageContext);
  const history = useHistory();
  const [message, setMessage] = useState("");

  const [values, setValues] = useState({
    emailId: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleOnChange(e) {
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
  }

  function TriggerLogin() {
    const serv = new services();

    const data={
      email:values.emailId,
      password:values.password
    }
    serv
      .signin(data)
      .then(() => {
        message1.setMessage("You Have Logged In Sucessfully");
        setTimeout(() => {
          message1.setMessage(null);
        }, 2000);
        Auth.login(() => {
          history.push("/profile");
        });
      })
      .catch(() => {
        setMessage("Incorrect Password Or emailId");
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      });
  }

  return (
    <Card className={styles.mainLogo} justify="center" boxShadow={3}>
      <CardContent>
        <div className={styles.LoginLogo}>
        <Logo />
        </div>
        <Typography className={styles.signInLabel} m={3} variant="h5">
          Sign in
        </Typography>
        <Typography className={styles.loginInfo}>Continue to Fundoo</Typography>
        <p className={styles.message}>{message}</p>
        <form action="">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <TextField
              className={styles.EmailInput}
              value={values.emailId}
              name="emailId"
              onChange={handleOnChange}
              fullWidth="true"
              id="outlined-basic"
              autoComplete='off'
              color="primary"
              label="Email Id *"
              variant="outlined"
            />
            <TextField
              className={styles.PasswordInput}
              value={values.password}
              name="password"
              onChange={handleOnChange}
              fullWidth="true"
              id="outlined-basic"
              type={showPassword ? "text" : "password"}
              color="primary"
              label="Password *"
              variant="outlined"
            ></TextField>
            {showPassword ? (
              <Visibility
                className={styles.showPaswordButtonForSignin}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <VisibilityOff
                className={styles.showPaswordButtonForSignin}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            )}
          </Grid>
          <Button onClick={TriggerLogin} className={styles.LoginButton}>
            Log In
          </Button>
        </form>
        <Link className={styles.ForgotPasswordLink} to="/forgotpassword">
          Forgot Password?
        </Link>

        <Link className={styles.CreateAccountLink} to="/signup">
          Create Account
        </Link>
      </CardContent>
    </Card>
  );
}
