import React, { Component } from "react";

import { Route } from "react-router-dom";
import styles from "./css/container.module.scss";
import Login from "./pages/signin";
import Signup from "./pages/signup";
import Forgotpassword from "./pages/forgotpassword";
import Resetpassword from "./pages/resetPassword";
import Profile from "./pages/profile";
import ProtectedRoute from "./services/protected.route";
import { MessageProvider } from "./components/messagecontext";
import Snackbars from './components/SnackBars'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSnackBar:false,
      id: "",
      message: null,
      messagesList:{
        "You Have Logged In Sucessfully":"success",
        "Incorrect Password or emailId":"error",
        "you Have successfully logged out":"error",
        "Password is been Sucessfully Reset":"sucess",
        "Congrats!! you Have successfully Registered":"success",
        "You Have Entered Wrong password":"error",
        "Set password link sent to you registered email, please check.":"warning",
        "Your Email ID is not found":"error",
        "Email ID is already taken" :"error",
        "Some Error Occured while processing request":"error"
      }
      
    };
    this.setId = this.setId.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.setSnackBar=this.setSnackBar.bind(this);
  }

  setId(id) {
    this.setState({ id: id });
  }

  setMessage(message) {
    this.setState({ message: message });
  }

  setSnackBar(condition){
    this.setState({ showSnackBar: condition });
  }

  render() {
    return (
      <MessageProvider
        value={{ message: this.state.message, 
          setMessage: this.setMessage,
          showSnakBar:this.state.showSnackBar,
          setSnackBar:this.setSnackBar
        }}
      >
        <Snackbars type={this.state.messagesList[this.state.message]} 
        message={this.state.message} show={this.state.showSnackBar}  />
        <div className={styles.container}>
          <Route path="/login" component={() => <Login />} />
          <Route path="/signup" component={() => <Signup />} />
          <Route  path="/forgotpassword" component={() => <Forgotpassword />} />
          <Route path="/resetpassword" component={() => <Resetpassword />} />
          <ProtectedRoute path="/profile" component={() => <Profile />} />
        </div>
      </MessageProvider>
    );
  }
}
