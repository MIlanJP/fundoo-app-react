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
import service from "../services/userservices";
import MessageContext from "../components/messagecontext";
import Logo from "../components/Logo";
import Validation from "../services/validation"

export default function ResetPassword() {
  const messages = useContext(MessageContext);
  const history = useHistory();
  const [values, setValues] = useState({
    oldpassword: "",
    newpassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  async function validate(e) {
   
    if (
        (
          Validation.validatePassword(values.oldpassword)
        ) &&
        values.oldpassword === values.newpassword &&
        values.oldpassword !== "" &&
        values.newpassword !== ""
    ) {
      ResetPasswordButton();
    }
  }

  async function ResetPasswordButton() {
    service
      .setNewPassWord(window.location.pathname, values.oldpassword)
      .then((data) => {
        console.log(data)
        if(data.status===204){
        history.push("/login");
        messages.setMessage("Password is been Sucessfully Reset");
        messages.setSnackBar(true);
       }else{
        messages.setMessage("Some Error Occured while processing request");
        messages.setSnackBar(true);
       }
       })
      .catch(() => {
        messages.setMessage("Error Occured while resetting password");
        messages.setSnackBar(true);
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
        <div className={styles.resetPageLogo} >
          <Logo />
        </div>
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
              error={!Validation.validatePassword( values.oldpassword)}
              helperText="Password must atleast contain alteast 8 character 1 Uppercase 1 special character 1 digit"
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
              helperText="Confirm   the   password    must   match    the   entered    password   "
              id="standard-basic"
              color="primary"
              error={!(values.newpassword===values.oldpassword)}
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
