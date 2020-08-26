import React, { useState } from "react";
import Header from "../../header";
import styles from "../../../scss/subscription.module.scss";
import Subscriptionbox from "./subscriptionbox";
import { Link } from "react-router-dom";
import Subscriptionpopup from "./subscriptionpopup";
export default function Subscription() {
  const [subscription] = useState([
    {
      price: "$99 per month",
      type: "advanced",
      pricePerMonth: "$99/month",
      Features:
        "Ability to add title description, images, labels, checklists and colors",
    },
    {
      price: "$49 per month",
      type: "basic",
      pricePerMonth: "$49/month",
      Features: "Ability to add only title and description.",
    },
  ]);

  const [subscriptionPopUp, setPopUp] = useState(["", ""]);
  const [popupToggle, setPopupToggle] = useState(false);
  const [getFunctions] = useState([setPopUp, setPopupToggle]);

  let dtl = subscription.map((details, index) => {
    return (
      <Subscriptionbox
        key={index}
        getFuntions={getFunctions}
        details={details}
      />
    );
  });

  return (
    <>
      <Header />
      <p className={styles.subscriptioncontent}>
        fundooNotes offered. Choose below service to Register.
      </p>
      <div className={styles.subscriptionList}>{dtl}</div>
      <Link to="/login" className={styles.subscriptionSignIn}>
        Sign in Instead
      </Link>
      <Subscriptionpopup
        subscriptionDetails={subscriptionPopUp}
        togglePopUp={popupToggle}
        sendToggleControl={setPopupToggle}
      />
    </>
  );
}
