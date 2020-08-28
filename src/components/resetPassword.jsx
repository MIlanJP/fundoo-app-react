import React,{ useState } from "react";
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
import { Link } from "react-router-dom";

export default function ResetPassword() {
 
  const [values,setValues]=useState({
    emailId:"",
    oldpassword:"",
    newpassword:""
})

function handleOnChange(e){
  setValues({...values,[e.currentTarget.name]:e.currentTarget.value})
}

  return (
    <Card className={`${styles.ResetPasswordCard} ${styles.mainLogo}`} justify="center" boxShadow={3}>
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
        <Typography className={styles.loginInfo}>Reset your password</Typography>

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
              fullWidth="true"
              id="standard-basic"
              color="secondary"
              label="Password *"
            />
            <TextField
            className={styles.PasswordInput}
            value={values.newpassword}
            name="newpassword"
            onChange={handleOnChange}
            fullWidth="true"
            id="standard-basic"
            color="secondary"
            label="Password *"
          />
          </Grid>
          <Link className={styles.ResetPasswordButton} to="/login">
          ResetPassword
        </Link>
        <Link to='/login' className={styles.GoBack}  >go back</Link>
        </form>

      </CardContent>
    </Card>
  );
}
