import React, { Component,useState } from 'react'

import {Route} from 'react-router-dom'
import styles from '../css/container.module.scss'
import Login from './login';
import signup from './signup'
import Forgotpassword from './forgotpassword'
import Resetpassword from './resetPassword'
import Profile from './profile'

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
            <Route path='/login' component={()=><Login  setId={this.setId}/>} />
            <Route path="/signup" component={signup} />
            <Route path="/forgotpassword" component={Forgotpassword}/>
            <Route path="/resetpassword" component={Resetpassword}/>
            <Route path="/profile" component={()=><Profile setId={this.setId}/>}/>
            </div>
        )
    }
}
