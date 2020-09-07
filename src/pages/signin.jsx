import React, { useState, useContext,useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import styles from "../scss/login.module.scss";
import {fetchUserIdByEmail,setEmailId} from '../redux'
import {useDispatch} from 'react-redux'
import "../css/logo.css";
import Auth from "../services/Auth"
import { Link, useHistory } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import services from "../services/userservices";
import MessageContext from "../components/messagecontext";
import Logo from "../components/Logo";

export default function Login(props) {
  const message1 = useContext(MessageContext);
  const history = useHistory();
  const [message] = useState("");
  const dispatch=useDispatch();

  const [values, setValues] = useState({
    emailId: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(()=>{
    console.log(new Date())

    console.log(Auth.isAuthenticated())
      if(Auth.isAuthenticated()){
        console.log(Auth.isAuthenticated())
        Auth.login(() => {
        dispatch(fetchUserIdByEmail(localStorage.getItem('emailId')))
          history.push(window.location.pathname)
        });
        
      }
  },[])

  function handleOnChange(e) {
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
  }

  function TriggerLogin() {
    const data={
      email:values.emailId,
      password:values.password
    }
    services.signIn(data)
      .then((data) => {
        if(data.status===200){
        localStorage.setItem("token",data.data.id)
        dispatch(fetchUserIdByEmail(values.emailId))
        localStorage.setItem('emailId',values.emailId)
        message1.setMessage("You Have Logged In Sucessfully");
        message1.setSnackBar(true);
        Auth.login(() => {
          history.push("/profile");
        });}
      })
      .catch((err) => {
        message1.setMessage("Incorrect Password or emailId");
        message1.setSnackBar(true);
      });
     
  }

  return (
    <Card className={styles.mainLogo} justify="center" >
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
              // fullWidth="true"
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
