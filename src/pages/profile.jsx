import React, { useContext } from "react";
import Auth from "../services/Auth";
import { useHistory } from "react-router-dom";
import MessageContext from "../components/messagecontext";

export default function Profile() {
  const messages = useContext(MessageContext);

  const history = useHistory();
  return (
    <>
      <div>WelCome Page</div>
      <button
        onClick={() => {
          Auth.logout(() => {
            history.push("/login");
            localStorage.removeItem('token')
            messages.setMessage("you Have successfully logged out");
            messages.setSnackBar(true);
          });
        }}
      >
        Log Out
      </button>
    </>
  );
}
