import React from 'react'
import styles from '../../../scss/subscription.module.scss'

export default function Subscriptionbox(props) {
    console.log(props)
    return (
        <div className={styles.subscriptionBox}>
            <div className={styles.subscriptionPrice} >price: {props.details.price}</div>
            <div className={styles.subscriptionType} >{props.details.type}</div>
            <div className >{props.details.pricePerMonth}</div>
            <div className >{props.details.Features}</div>
        </div>
    )
}
