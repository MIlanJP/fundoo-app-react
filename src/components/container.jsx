import React, { Component,useState } from 'react'

import {Route} from 'react-router-dom'
import styles from '../css/container.module.scss'
import Login from './login';
import Signup from './signup'
import Forgotpassword from './forgotpassword'
import Resetpassword from './resetPassword'
import Profile from './profile'
import  ProtectedRoute  from '../services/protected.route';
import NonProtectedRoute from '../services/unprotected.route'

export default class Container extends Component {
    
    constructor(props){
        super(props)
        this.state={
            id:""
        }
        this.setId=this.setId.bind(this);
    }

     setId(id){
        this.setState({id:id})
    }

    render() {
        return (
            <div className={styles.container}>
            <NonProtectedRoute path='/login' component={()=><Login/>} />
            <NonProtectedRoute path="/signup" component={()=><Signup/>} />
            <NonProtectedRoute path="/forgotpassword" component={()=><Forgotpassword/>}/>
        <NonProtectedRoute path="/resetpassword" component={()=><Resetpassword/>}/>
            <ProtectedRoute path="/profile" component={()=><Profile/>}/>
            </div>
        )
    }
}
