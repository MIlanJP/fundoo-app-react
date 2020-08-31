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

export default function ResetPassword() {
  const messages=useContext(MessageContext)
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
        values.oldpassword !== values.newpassword &&
        values.oldpassword !== "" &&
        values.newpassword !== ""
      )
    ) {
      e.preventDefault();
    }

    

  }

 async  function ResetPasswordButton(){
    const serv=new service();
    serv.signin(values.emailId,values.oldpassword).then(data=>{
        serv.resetpassword(data.data.id,values.newpassword).then(
        data=>{console.log(data)
          history.push('/login')
          messages.setMessage("Password is been Sucessfully Reset");
    setTimeout(()=>{messages.setMessage(null)},2000)

        }
      )
      console.log("Printing values")
    }).catch(err=>{console.log(err)
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
          Reset your password
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
              className={styles.EmailInput}
              value={values.emailId}
              name="emailId"
              onChange={handleOnChange}
              fullWidth="true"
              id="standard-basic"
              color="secondary"
              label="Email Id *"
            />
            <TextField
              className={styles.PasswordInput}
              value={values.oldpassword}
              name="oldpassword"
              onChange={handleOnChange}
              type={showOldPassword ? "text" : "password"}
              fullWidth="true"
              id="standard-basic"
              color="secondary"
              label="Old Password *"
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
              id="standard-basic"
              color="secondary"
              type={showNewPassword ? "text" : "password"}
              label="New Password *"
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
