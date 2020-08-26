import React from "react";
import styles from "../../../scss/subscription.module.scss";

export default function Subscriptionbox(props) {
  const handleClick = () => {
    props.getFuntions[0]([props.details.type, props.details.pricePerMonth]);
    props.getFuntions[1](true);
  };
  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className={styles.subscriptionBox}
    >
      <div className={styles.subscriptionPrice}>
        price: {props.details.price}
      </div>
      <div className={styles.subscriptionType}>{props.details.type}</div>
      <ul>
        <li>{props.details.pricePerMonth}</li>
        <li>{props.details.Features}</li>
      </ul>
      <div className={styles.addToCart}>ADD TO CART</div>
    </div>
  );
}
