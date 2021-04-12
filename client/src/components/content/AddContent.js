import axios from 'axios';
import React, { Component } from 'react';

export default class AddContent extends Component {
    constructor() {
        super()
        this.state = {
            jwt: localStorage.getItem('jwt'),
            description: '',
            url: '',
            image: '',
            category: ''
        }
    }

    handleInput = (e)  => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = () => {
        const addContent = {
            jwt: this.state.jwt,
            description: this.state.description,
            url: this.state.url,
            image: this.state.image,
            category: this.state.category
        }
        axios.post('/add', addContent)
        .then(res => console.log(res))
    }

    render() {
        return (
            <div id="addContentContainer">
                <form id="addContentForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="category">category:
                        <input type="text" name="category" onChange={e => this.handleInput(e)} value={this.state.category} required /><br />
                    </label>
                    <label htmlFor="description">description:
                        <input type="text" name="description" onChange={e => this.handleInput(e)} value={this.state.description} required /><br />
                    </label>
                    <label htmlFor="url">link:
                        <input type="url" name="url" onChange={e => this.handleInput(e)} value={this.state.url} required /><br />
                    </label>
                    <label htmlFor="image">picture:
                        <input type="text" name="image" onChange={e => this.handleInput(e)} value={this.state.image} required /><br />
                    </label>
                    <input type="submit" value="add"/>
                </form>
            </div>
        )
    }
}