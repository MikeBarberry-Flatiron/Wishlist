import React, { Component } from 'react';

export default class UserContent extends Component {
    render() {
        return(
            <div className="contentContainer">
                {this.props.content.map(content => {
                    const cb = () => { this.props.handleDelete(content.id) }
                    return <div key={content.id} className="userContent">
                        <button onClick={cb} className="deleteButton">remove</button>
                        <h2>{content.category}</h2>
                        <a href={content.url} target="_blank" rel="noreferrer"><img className="contentImage" src={content.image} alt="user_content_image"></img></a>
                        <p>{content.description}</p>
                    </div>
                })}
            </div>
        )
    }
}