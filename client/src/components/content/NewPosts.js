import React from 'react'
import { LikeButton } from '../content'

const NewPosts = ({ newPosts, handleLike }) => {
    return(
        <div>
            <h3 id="newContent">New Posts</h3>
            <div className="newContentContainer">
                {newPosts?.map(post => {
                    const cb = () => { handleLike(post.id) }
                    return <div key={post.id} className="newContent">
                        <h2>{post.user}</h2>
                        <img className="contentImage" src={post.image} alt="user_content_image"></img>
                        <span><LikeButton cb={cb} />{post.likes}</span>
                    </div>
                })}
            </div>
        </div>
    )
}

export default NewPosts
