import React, { Component } from 'react';

export default class AuthToggle extends Component {
    render() {
        return (
            <button id={this.props.id} onClick={this.props.setPage}>{this.props.type ? "register" : "login"}</button>
        )
    }
}