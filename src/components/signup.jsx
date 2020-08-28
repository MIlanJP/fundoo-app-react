import React,{useState} from "react";
import Header from "./header";
import { Link } from "react-router-dom";
import secureLogo from "../Assets/img/account.svg";
import styles from "../scss/signup.module.scss";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
} from "@material-ui/core";
import "../css/logo.css";

const inputProps = {
  step: 300,
};

export default function Signup() {

    const [values,setValues]=useState({
        firstname:"",
        secondname:"",
        emailId:"",
        password:"",
        confirm:""
    })

    function handleOnChange(e){
      setValues({...values,[e.currentTarget.name]:e.currentTarget.value})
    }

  return (

      <Card className={styles.signUpCard}>
        <CardContent>
          <Typography className={`Logo ${styles.Logo}`} variant="h5">
            <span className="f-red">F</span>
            <span className="u-blue">u</span>
            <span className="n-yellow">n</span>
            <span className="d-red">d</span>
            <span className="o-green">o</span>
            <span className="o-blue">o</span>
          </Typography>
          <Typography variant="h5" className={styles.signUpLabel}>
            Create your Fundoo Account
          </Typography>
          <Grid
            className={styles.gridContainer}
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item xs={12} sm={6} className={styles.gridItem}>
              <TextField
              name='firstname'
              onChange={handleOnChange}
                value={values.firstname}
                fullWidth="true"
                inputProps={inputProps}
                id="outlined-basic"
                label="First name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} className={styles.gridItem}>
              <TextField
              name="secondname"
              onChange={handleOnChange}
              value={values.secondname}
                fullWidth="true"
                id="outlined-basic"
                label="Second name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} className={styles.gridItem}>
              <TextField
              name='emailId'
              onChange={handleOnChange}
              value={values.emailId}
                fullWidth="true"
                id="outlined-basic"
                label="Email Id"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} className={styles.gridItem}>
              <TextField
              name='password'
              onChange={handleOnChange}
              value={values.password}
                fullWidth="true"
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} className={styles.gridItem}>
              <TextField
              name='confirm'
              value={values.confirm}
              onChange={handleOnChange}
                fullWidth="true"
                id="outlined-basic"
                label="Confirm"
                variant="outlined"
              />
            </Grid>
          </Grid>
            <Link className={styles.SignUpButton} to="/profile">
              Next
            </Link>
          <Link className={styles.LoginLink} to="/login">
            Sign In Instead
          </Link>
        </CardContent>
      </Card>
  );
}
// <img className={styles.signupLogo} src={secureLogo} />
