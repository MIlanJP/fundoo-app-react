import React, { Component } from 'react'

import {Route} from 'react-router-dom'
import Subscription from './basepages/subscription/subscription'
import styles from '../css/container.module.scss'
import Login from './login';
import signup from './signup'
import Forgotpassword from './forgotpassword'

export default class Container extends Component {
    render() {
        return (
            <div className={styles.container}>
            <Route path='/subscription' component={Subscription}   />
            <Route path='/login' component={Login} />
            <Route path="/signup" component={signup} />
            <Route path="/forgotpassword" component={Forgotpassword}/>
            </div>
        )
    }
}
