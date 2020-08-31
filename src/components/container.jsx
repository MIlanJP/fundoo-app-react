import React, { Component, useState } from "react";

import { Route } from "react-router-dom";
import styles from "../css/container.module.scss";
import Login from "./login";
import Signup from "./signup";
import Forgotpassword from "./forgotpassword";
import Resetpassword from "./resetPassword";
import Profile from "./profile";
import ProtectedRoute from "../services/protected.route";
import NonProtectedRoute from "../services/unprotected.route";
import { MessageProvider } from "./messagecontext";
import EnterNewPassword from './EnterNewPassword'

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      message: null,
    };
    this.setId = this.setId.bind(this);
    this.setMessage=this.setMessage.bind(this);
  }

  setId(id) {
    this.setState({ id: id });
  }

  setMessage(message){
    this.setState({ message: message });
  }

  render() {
    return (
      <MessageProvider value={{message:this.state.message,setMessage:this.setMessage}}>
         {this.state.message==="You Have Logged In Sucessfully"&&<div className={styles.greenmessage}  >{this.state.message}</div>}
         {this.state.message==="you Have successfully logged out"&&<div className={styles.messages}  >{this.state.message}</div>}
         {this.state.message==="Password is been Sucessfully Reset"&&<div className={styles.resetpasswordMessage}  >{this.state.message}</div>}
         {this.state.message==="Congrats!! you Have successfully Registered"&&<div className={styles.registeredMessage}  >{this.state.message}</div>}
         {this.state.message==="You Have Entered Wrong password"&&<div className={styles.messages}  >{this.state.message}</div>}
         {this.state.message==="Set password link sent to you registered email, please check."&&<div className={styles.greenmessage}  >{this.state.message}</div>}
         {this.state.message==="Your Email ID is not found"&&<div className={styles.messages}  >{this.state.message}</div>}
        <div className={styles.container}>
          <Route path="/login" component={() => <Login />} />
          <Route path="/signup" component={() => <Signup />} />
          <Route path="/forgotpassword" component={() => <Forgotpassword />} />
          <Route exact path="/resetpassword" component={() => <Resetpassword />} />
          {/* <Route path="/resetpassword" component={() => <EnterNewPassword />} /> */}
          <ProtectedRoute path="/profile" component={() => <Profile />} />
        </div>
      </MessageProvider>
    );
  }
}
