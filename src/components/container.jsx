import React, { Component } from 'react'

import {Route} from 'react-router-dom'
import Subscription from './basepages/subscription/subscription'

export default class Container extends Component {
    render() {
        return (
            <div className="container">
            <Route path='/subscription' component={Subscription}   />
            </div>
        )
    }
}
