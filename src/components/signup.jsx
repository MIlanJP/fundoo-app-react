import React,{useState} from "react";
import Header from "./header";
import { Link } from "react-router-dom";
import secureLogo from "../Assets/img/account.svg";
import styles from "../scss/signup.module.scss";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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


    // const [helperText]=useState({
    //   firstname:"First Name Must have least 5 Character",
    //   secondname:"Second Name Must have least 5 Character",
    //   emailId:false,
    //   password:false,
    //   confirm:false
    // })

    const[paswordVisibilty,setPasswordVisibility]=useState(true)

   const[validationStatus,setValidationStatus]=useState({
    firstname:false,
    secondname:false,
    emailId:false,
    password:false,
    confirm:false
   })

   function onInputClick(e){
   if(!( !validationStatus.firstname&&!validationStatus.secondname&&
    !validationStatus.emailId&&!validationStatus.password&&!validationStatus.confirm
    && values.firstname!==""&&values.secondname!==""&&
    values.emailId!==""&&values.password!==""&&values.confirm!==""
    )){
      e.preventDefault();
    }
   }

    function handleOnChange(e){
      setValues({...values,[e.currentTarget.name]:e.currentTarget.value})
      const name1=e.currentTarget.name;
      const val1=e.currentTarget.value
      if(name1==='firstname'){
          setValidationStatus({...validationStatus,[name1]:(val1.length<5)})
      }else  if(name1==='secondname'){
        setValidationStatus({...validationStatus,[name1]:(val1.length<5)})

      }else  if(name1==='emailId'){
        setValidationStatus({...validationStatus,[name1]:!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(val1))})
      }else  if(name1==='password'){
        setValidationStatus({...validationStatus,[name1]:!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(val1))})

      }else  if(name1==='confirm'){
        setValidationStatus({...validationStatus,[name1]:!(values.password===val1)})

      }
      
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
            spacing={2}
          >
            <Grid item xs={6} className={styles.gridItem}>
              <TextField
              name='firstname'
              onClick={()=>{}}
              onChange={handleOnChange}
                value={values.firstname}
                fullWidth="true"
                inputProps={inputProps}
                id="outlined-basic"
                label="First name"
                error={validationStatus.firstname}
                helperText=""
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}  className={styles.gridItem}>
              <TextField
              name="secondname"
              onChange={handleOnChange}
              value={values.secondname}
                fullWidth="true"
                id="outlined-basic"
                label="Second name"
                error={validationStatus.secondname}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} className={styles.gridItem}>
              <TextField
              name='emailId'
              onChange={handleOnChange}
              value={values.emailId}
                fullWidth="true"
                error={validationStatus.emailId}
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
                type={paswordVisibilty ? "password":"text"}
                error={validationStatus.password}
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={5} className={styles.gridItem}>
              <TextField
              name='confirm'
              value={values.confirm}
              onChange={handleOnChange}
              type={paswordVisibilty ? "password":"text"}
              error={validationStatus.confirm}
                fullWidth="true"
                id="outlined-basic"
                label="Confirm"
                variant="outlined"
              />
            </Grid>
            <Grid xs={1}
            onClick={()=>{setPasswordVisibility(!paswordVisibilty)}}
            >
            {paswordVisibilty ?<VisibilityOff/>:<Visibility/>}
            </Grid>
          </Grid>
            <Link onClick={(e)=>{onInputClick(e)}}  className={styles.SignUpButton} to="/profile">
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
