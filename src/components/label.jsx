import React from 'react'
import styles from '../scss/profile.module.scss'
import CreateNoteTabBeforeClick from './CreateNoteTabBeforeClick'

export default function Label(props) {
    return (
        <div className={styles.Label}  >
<CreateNoteTabBeforeClick/>
{props.labelName}'s Label
        </div>
    )
}
