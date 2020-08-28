import React, { Component } from 'react'

import {Route} from 'react-router-dom'
import styles from '../css/container.module.scss'
import Login from './login';
import signup from './signup'
import Forgotpassword from './forgotpassword'
import Resetpassword from './resetPassword'

export default class Container extends Component {
    render() {
        return (
            <div className={styles.container}>
            <Route path='/login' component={Login} />
            <Route path="/signup" component={signup} />
            <Route path="/forgotpassword" component={Forgotpassword}/>
            <Route path="/resetpassword" component={Resetpassword}/>
            </div>
        )
    }
}
