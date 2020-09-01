import React, { useState, useContext } from "react";
import styles from "../scss/forgotpassword.module.scss";
import MessageContext from "../components/messagecontext";
import { useHistory } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
} from "@material-ui/core";
import "../css/logo.css";
import { Link } from "react-router-dom";
import service from "../services/userservices";
import Logo from "../components/Logo";
export default function Forgotpassword() {
  const messages = useContext(MessageContext);
  const history = useHistory();
  const [values, setValues] = useState({
    emailId: "",
    password: "",
  });

  function handleOnChange(e) {
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
  }

  function handleOnClick() {
    service
      .recoverEmailID(values.emailId)
      .then((data) => {
        console.log(data)
        history.push("/login");
        messages.setMessage(data.data.message);
        messages.setSnackBar(true);
      })
      .catch((err) => {
        console.log({err})
        messages.setMessage("Your Email ID is not found");
        messages.setSnackBar(true);
      });
  }

  return (
    <Card className={styles.mainLogo} justify="center" boxShadow={3}>
      <CardContent>
        <div className="Logo forgotPassword">
          <Logo />
        </div>
        <Typography
          className={(styles.signInLabel, styles.findEmailLabel)}
          m={3}
          variant="h5"
        >
          Find your email
        </Typography>
        <Typography className={styles.recoverEmailLabel}>
          Recover your email
        </Typography>

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
              autoComplete="off"
              onChange={handleOnChange}
              fullWidth="true"
              id="standard-basic"
              color="primary"
              label="Email Id *"
              variant="outlined"
            />
          </Grid>
        </form>
        <Link className={styles.goBackButton} to="/login">
          Back
        </Link>
        <Link onClick={handleOnClick} className={styles.findEmail}>
          Next
        </Link>
      </CardContent>
    </Card>
  );
}
