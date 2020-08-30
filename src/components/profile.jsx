import React from 'react'
import Auth from '../services/Auth'
import { useHistory } from 'react-router-dom';

export default function Profile() {
    const history = useHistory();
    return (
        <>
        <div>
            WelCome Page
        </div>
        <button onClick={() =>{Auth.logout(()=>{history.push("/login")})}}>Log Out</button>
    </>
    )
}   
