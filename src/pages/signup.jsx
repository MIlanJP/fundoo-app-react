import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../scss/signup.module.scss";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import signUpRequest from "../services/userservices";
import MessageContext from "../components/messagecontext";
import Validation from "../services/validation";

import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";
import "../css/logo.css";
import Logo from "./../components/Logo";

export default function Signup() {
  const messages = useContext(MessageContext);

  const history = useHistory();
  const [values, setValues] = useState({
    firstname: "",
    secondname: "",
    emailId: "",
    password: "",
    confirm: "",
  });

  const [paswordVisibilty, setPasswordVisibility] = useState(true);
  const [helperText, setHelperText] = useState("");

  const [validationStatus, setValidationStatus] = useState({
    firstname: false,
    secondname: false,
    emailId: false,
    password: false,
    confirm: false,
  });

  function onInputClick(e, callback) {
    if (
      !(
        !validationStatus.firstname &&
        !validationStatus.secondname &&
        !validationStatus.emailId &&
        !validationStatus.password &&
        !validationStatus.confirm &&
        values.firstname !== "" &&
        values.secondname !== "" &&
        values.emailId !== "" &&
        values.password !== "" &&
        values.confirm !== ""
      )
    ) {
      e.preventDefault();
      return;
    } else {
      return callback(e);
    }
  }

  function fetchdata(e) {
    const data = {
      firstName: values.firstname,
      lastName: values.secondname,
      email: values.emailId,
      password: values.password,
      service: "advance",
    };
    signUpRequest
      .signUp(data)
      .then(() => {
        history.push("/login");
        messages.setMessage("Congrats!! you Have successfully Registered");
        messages.setSnackBar(true);
      })
      .catch(() => {
        e.preventDefault();
        messages.setMessage("Email ID is already taken");
        messages.setSnackBar(true);
        setHelperText("Email Id is Already Taken");
        if (validationStatus.emailId === false) {
          validationStatus.emailId = true;
        }
        setTimeout(() => {
          setHelperText("");
          validationStatus.emailId = false;
        }, 2000);
        return false;
      });
  }

  function handleOnChange(e) {
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
    const name1 = e.currentTarget.name;
    const val1 = e.currentTarget.value;
    if (name1 === "firstname") {
      setValidationStatus({
        ...validationStatus,
        [name1]: !Validation.vallidateName(val1),
      });
    } else if (name1 === "secondname") {
      setValidationStatus({
        ...validationStatus,
        [name1]: !Validation.vallidateName(val1),
      });
    } else if (name1 === "emailId") {
      setValidationStatus({
        ...validationStatus,
        [name1]: !Validation.validateEmail(val1),
      });
    } else if (name1 === "password") {
      setValidationStatus({
        ...validationStatus,
        [name1]: !Validation.validatePassword(val1),
      });
    } else if (name1 === "confirm") {
      setValidationStatus({
        ...validationStatus,
        [name1]: !(values.password === val1),
      });
    }
  }

  return (
    <Card className={styles.signUpCard}>
      <CardContent>
        <div className={styles.signupLogoLabel}>
          <Logo />
        </div>
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
              name="firstname"
              onClick={() => {}}
              onChange={handleOnChange}
              value={values.firstname}
              fullWidth={true}
              autoComplete="off"
              id="outlined-basic"
              label="First name"
              error={validationStatus.firstname}
              helperText="Enter First Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} className={styles.gridItem}>
            <TextField
              name="secondname"
              onChange={handleOnChange}
              value={values.secondname}
              fullWidth={true}
              id="outlined-basic"
              autoComplete="off"
              label="Second name"
              helperText="Enter Last Name"
              error={validationStatus.secondname}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} className={styles.gridItem}>
            <TextField
              name="emailId"
              onChange={handleOnChange}
              value={values.emailId}
              fullWidth={true}
              error={validationStatus.emailId}
              helperText={helperText}
              id="outlined-basic"
              label="Email Id"
              helperText="Enter valid Email ID"
              autoComplete="off"
              variant="outlined"
            />
          </Grid>
          <div className={styles.passwordBlock}>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item sm={6} s={12} xs={12} className={styles.gridItem}>
                <TextField
                  name="password"
                  onChange={handleOnChange}
                  value={values.password}
                  fullWidth={true}
                  type={paswordVisibilty ? "password" : "text"}
                  error={validationStatus.password}
                  id="outlined-basic"
                  label="Password"
                  autoComplete="off"
                  helperText="Password must atleast contain alteast 8 character 1 Uppercase 1 special character 1 digit"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={11}
                s={11}
                sm={5}
                className={(styles.gridItem, styles.gridConfirm)}
              >
                <TextField
                  name="confirm"
                  value={values.confirm}
                  onChange={handleOnChange}
                  type={paswordVisibilty ? "password" : "text"}
                  error={validationStatus.confirm}
                  fullWidth={true}
                  id="outlined-basic"
                  helperText="Confirm   the   password    must   match    the   entered    password   "
                  label="Confirm"
                  autoComplete="off"
                  variant="outlined"
                />
              </Grid>
              <Grid
                className={styles.signUpVisibility}
                xs={1}
                onClick={() => {
                  setPasswordVisibility(!paswordVisibilty);
                }}
              >
                {paswordVisibilty ? <VisibilityOff /> : <Visibility />}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Link
          onClick={(e) => {
            onInputClick(e, fetchdata);
          }}
          className={styles.SignUpButton}
        >
          Next
        </Link>
        <Link className={styles.LoginLink} to="/login">
          Sign In Instead
        </Link>
      </CardContent>
    </Card>
  );
}
