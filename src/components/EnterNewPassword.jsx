import React, { useState,useContext } from "react";
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
import { Link,useHistory } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import service from '../services/services'
import MessageContext from './messagecontext'

export default function EnterNewPassword() {
  const messages=useContext(MessageContext)
  const history = useHistory();
  const [values, setValues] = useState({
    emailId: "",
    password: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 async function validate(e) {
  ResetPasswordButton();
    if (
      !(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
          values.emailId
        ) &&
        values.password === values.confirm &&
        values.password !== "" &&
        values.confirm !== ""
      )
    ) {
      e.preventDefault();
    }

    

  }

 async  function ResetPasswordButton(){
     console.log(window.location.pathname)
    const serv=new service();
        serv.setNewPassWord(window.location.pathname,values.password).then(
        data=>{console.log(data)
          history.push('/login')
          messages.setMessage("Password is been Sucessfully Reset");
    setTimeout(()=>{messages.setMessage(null)},2000)
        }
      )
    .catch(err=>{console.log(err)
      messages.setMessage("You Have Entered Wrong password");
      setTimeout(()=>{messages.setMessage(null)},2000)
    })
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
      <CardContent>
        <Typography className="Logo" variant="h5">
          <span className="f-red">F</span>
          <span className="u-blue">u</span>
          <span className="n-yellow">n</span>
          <span className="d-red">d</span>
          <span className="o-green">o</span>
          <span className="o-blue">o</span>
        </Typography>
        <Typography className={styles.signInLabel} m={3} variant="h5">
          ResetPassword
        </Typography>
        <Typography className={styles.loginInfo}>
        Enter New Password
        </Typography>

        <form action="">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
            lg={12}
          >
            <TextField
              className={styles.PasswordInput}
              value={values.password}
              name="password"
              onChange={handleOnChange}
              type={showPassword ? "text" : "password"}
              fullWidth="true"
              id="standard-basic"
              color="secondary"
              label="Password *"
            />
            {showPassword ? (
              <Visibility
                className={styles.showPaswordButton}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <VisibilityOff
                className={styles.showPaswordButton}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            )}

            <TextField
              className={styles.PasswordInput}
              value={values.confirm}
              name="confirm"
              onChange={handleOnChange}
              fullWidth="true"
              id="standard-basic"
              color="secondary"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password *"
            />
            {showConfirmPassword ? (
              <Visibility
                className={styles.showPaswordButton}
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              />
            ) : (
              <VisibilityOff
                className={styles.showPaswordButton}
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              />
            )}
          </Grid>
          <Link
            onClick={validate}
            className={styles.ResetPasswordButton}
           
          >
            Reset Password
          </Link>
          <Link to="/login" className={styles.GoBack}>
            go back
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
