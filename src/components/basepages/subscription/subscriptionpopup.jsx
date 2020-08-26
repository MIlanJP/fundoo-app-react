import React, { useState } from "react";
import styles from "../../../scss/subscription.module.scss";

export default function Subscriptionpopup(props) {
  const [features] = useState(["Content1", "Content2", "Content3"]);
  const [defaultContent, changeContent] = useState(features[0]);
  //   const [popup]=useState(props.togglePopUp)

  const handleChangeContent = (index) => {
    changeContent(features[index]);
  };

  const slides = features.map((feature, index) => {
    return (
      <>
        <div
          key={`feature${index}`}
          onClick={() => handleChangeContent(index)}
          className={styles.popUpSelectOptions}
        >
          Feature{index + 1}
        </div>
      </>
    );
  });

  const handleClick = () => {
    props.sendToggleControl(!props.togglePopUp);
  };
  return props.togglePopUp ? (
    <div
      onClick={() => {
        handleClick();
      }}
      className={styles.subscriptionPopUpBackground}
    >
      <div   className={styles.subscriptionPopUp}>
        <div className={styles.popUpTopLayer}>
          {props.subscriptionDetails[0]} Pack Details{" "}
          <span>{props.subscriptionDetails[1]}</span>{" "}
        </div>
        <div className={styles.popUpSelect}>{slides}</div>
        <div className={styles.popUpContent}>{defaultContent}</div>
      </div>
    </div>
  ) : null;
}
