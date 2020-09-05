import React from 'react'
import styles from '../scss/profile.module.scss'
export default function Label(props) {
    return (
        <div className={styles.Label}  >
            {props.labelName}'s Label
        </div>
    )
}
