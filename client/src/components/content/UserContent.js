import React from 'react';

const UserContent =  ({ handleDelete, content }) => {
    return(
        <div className="contentContainer">
            {content.map(content => {
                const cb = () => { handleDelete(content.id) }
                return <div key={content.id} className="userContent">
                    <button onClick={cb} className="deleteButton">remove</button>
                    <h2>{content.category}</h2>
                    <a href={content.url} target="_blank" rel="noreferrer"><img className="contentImage" src={content.image} alt="user_content_image"></img></a>
                    <svg width="24px" height="24px" viewBox="0 0 24 24"><svg id="external_link" class="icon_svg-stroke" stroke="#666" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 13.5 17 19.5 5 19.5 5 7.5 11 7.5"></polyline><path d="M14,4.5 L20,4.5 L20,10.5 M20,4.5 L11,13.5"></path></svg></svg>
                    <p>{content.description}</p>
                </div>
            })}
        </div>
    )
}

export default UserContent