import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
} from "@material-ui/core";
import styles from "../scss/login.module.scss";
import "../css/logo.css";
import { Link, useHistory } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import service from "../services/services";
import MessageContext from "../components/messagecontext";
import Logo from "../components/Logo";

export default function ResetPassword() {
  const messages = useContext(MessageContext);
  const history = useHistory();
  const [values, setValues] = useState({
    emailId: "",
    oldpassword: "",
    newpassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  async function validate(e) {
    ResetPasswordButton();
    if (
      !(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
          values.emailId
        ) &&
        values.oldpassword === values.newpassword &&
        values.oldpassword !== "" &&
        values.newpassword !== ""
      )
    ) {
      e.preventDefault();
    }
  }

  async function ResetPasswordButton() {
    const serv = new service();
    serv
      .setNewPassWord(window.location.pathname, values.oldpassword)
      .then(() => {
        history.push("/login");
        messages.setMessage("Password is been Sucessfully Reset");
        setTimeout(() => {
          messages.setMessage(null);
        }, 2000);
      })
      .catch(() => {
        messages.setMessage("Error Occured while resetting password");
        setTimeout(() => {
          messages.setMessage(null);
        }, 2000);
      });
  }

  function handleOnChange(e) {
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
  }

  return (
    <Card
      className={`${styles.ResetPasswordCard} ${styles.mainLogo}`}
      justify="center"
      boxShadow={3}
    >
      <CardContent className={styles.resetCard}>
        <Logo />
        <Typography className={styles.resetLabel} m={3} variant="h5">
          Reset Password
        </Typography>

        <form action="">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <TextField
              className={styles.PasswordInput}
              value={values.oldpassword}
              name="oldpassword"
              onChange={handleOnChange}
              type={showOldPassword ? "text" : "password"}
              fullWidth="true"
              id="standard-basic"
              autoComplete="off"
              helperText="Enter your New Password"
              color="primary"
              label="Password *"
              variant="outlined"
            />
            {showOldPassword ? (
              <Visibility
                className={styles.showPaswordButton}
                onClick={() => {
                  setShowOldPassword(!showOldPassword);
                }}
              />
            ) : (
              <VisibilityOff
                className={styles.showPaswordButton}
                onClick={() => {
                  setShowOldPassword(!showOldPassword);
                }}
              />
            )}

            <TextField
              className={styles.PasswordInput}
              value={values.newpassword}
              name="newpassword"
              onChange={handleOnChange}
              fullWidth="true"
              helperText="Confirm your the password again"
              id="standard-basic"
              color="primary"
              type={showNewPassword ? "text" : "password"}
              label="Confirm Password *"
              variant="outlined"
            />
            {showNewPassword ? (
              <Visibility
                className={styles.showPaswordButton}
                onClick={() => {
                  setShowNewPassword(!showNewPassword);
                }}
              />
            ) : (
              <VisibilityOff
                className={styles.showPaswordButton}
                onClick={() => {
                  setShowNewPassword(!showNewPassword);
                }}
              />
            )}
          </Grid>
          <Link onClick={validate} className={styles.ResetPasswordButton}>
            Reset Password
          </Link>
          <Link to="/login" className={styles.GoBack}>
            go back to Sign page
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
