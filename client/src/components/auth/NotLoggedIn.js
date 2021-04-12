import React, { Component } from 'react';
import NotAuthorized from '../../assets/notAuthorized.jpeg'

export default class Login extends Component {
    render() {
        return(
            <div>
                <img src={NotAuthorized} alt="not-authorized-to-view-page"/>
                <h1>You need to log in to view this page.</h1>
            </div>
        )
    }
}