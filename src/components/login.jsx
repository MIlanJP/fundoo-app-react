import React,{ useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import styles from "../scss/login.module.scss";
import "../css/logo.css";
import { Link ,useHistory} from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import services from '../services/services'

export default function Login(props) {
  const history = useHistory();
  const[message,setMessage]=useState('')

  const [values,setValues]=useState({
    emailId:"",
    password:"",
})

const [showPassword,setShowPassword]=useState(false)

function handleOnChange(e){
  setValues({...values,[e.currentTarget.name]:e.currentTarget.value})
}

function TriggerLogin(){
  const serv=new services();
  serv.signin(values.emailId,values.password).then(data=>{
console.log("Success");
history.push('/profile')
  }).catch(err=>{
    setMessage("Incorrect Password Or emailId ")
    console.log(err)
    setTimeout(()=>{
    setMessage(null)
    },2000)
  })
}

  return (
    <Card className={styles.mainLogo} justify="center" boxShadow={3}>
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
          Sign in
        </Typography>
        <Typography className={styles.loginInfo}>Continue to Fundoo</Typography>
        <p className={styles.message} >{message}</p>
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
              id="standard-basic"
              color="secondary"
              label="Email Id *"
            />
            <TextField
              className={styles.PasswordInput}
              value={values.password}
              name="password"
              onChange={handleOnChange}
              fullWidth="true"
              id="standard-basic"
              type={showPassword?'text':'password'}
              color="secondary"
              label="Password *"
            >
            </TextField>
            {showPassword ? <Visibility  className={styles.showPaswordButton}  onClick={()=>{setShowPassword(!showPassword)}} /> : 
            <VisibilityOff className={styles.showPaswordButton}   onClick={()=>{setShowPassword(!showPassword)}}/>}
          </Grid>
          <Button onClick={TriggerLogin}  className={styles.LoginButton}>Log In</Button>
        </form>
        <Link className={styles.ForgotPasswordLink} to="/forgotpassword">
          Forgot Password?
        </Link>
        <Link className={styles.ResetPasswordLink} to="/resetpassword">
        Reset Password?
      </Link>
        <Link className={styles.CreateAccountLink} to="/signup">
          Create Account
        </Link>
      </CardContent>
    </Card>
  );
}
