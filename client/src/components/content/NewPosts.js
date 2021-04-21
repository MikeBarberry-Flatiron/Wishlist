import React from 'react'
import LikeButton from './LikeButton'

const NewPosts = ({ newPosts }) => {
    return(
        <div>
            <h3 id="newContent">New Posts</h3>
            <div className="newContentContainer">
                {newPosts.map(post => {
                    return <div key={post.id} className="newContent">
                        <h2>{post.user}</h2>
                        <img className="contentImage" src={post.image} alt="user_content_image"></img>
                        <LikeButton />
                    </div>
                })}
            </div>
        </div>
    )
}

export default NewPosts