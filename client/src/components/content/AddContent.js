import React, { useState } from 'react';
import { addContent } from '../../store/actions/contentActions'
import { connect } from 'react-redux';


const AddContent = (props) => {
    const [content,setContent] = useState({
        description: '',
        url: '',
        image: '',
        category: ''
    });

    const jwt = localStorage.getItem('jwt')

    const handleInput = (e)  => {
        setContent({
            ...content,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const addContent = {
            jwt: jwt,
            description: content.description,
            url: content.url,
            image: content.image,
            category: content.category
        }
        props.addContent(addContent)
    };

    return (
        <div id="addContentContainer">
            <form id="addContentForm" onSubmit={handleSubmit}>
                <label htmlFor="category">category:
                    <select onChange={handleInput} name="category" id="categoryDropdown" required>
                        <option value="">select a category</option>
                        <option value="clothing">clothing</option>
                        <option value="lifestyle">lifestyle</option>
                        <option value="technology">technology</option>
                        <option value="household">household</option>
                    </select><br></br>
                </label>
                <label htmlFor="description">description:
                    <input type="text" name="description" onChange={e => handleInput(e)} value={content.description} minLength="5" maxLength="120" required /><br />
                </label>
                <label htmlFor="url">link:
                    <input type="url" name="url" placeholder="website" onChange={e => handleInput(e)} value={content.url} required /><br />
                </label>
                <label htmlFor="image">picture:
                    <input type="url" name="image" placeholder="image url" onChange={e => handleInput(e)} value={content.image} required /><br />
                </label>
                <input type="submit" value="add"/>
            </form>
        </div>
    );
};

export default connect(null, { addContent })(AddContent)