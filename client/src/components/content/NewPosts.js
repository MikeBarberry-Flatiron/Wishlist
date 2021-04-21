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
                        <a href={post.url} target="_blank" rel="noreferrer"><img className="contentImage" src={post.image} alt="user_content_image"></img></a>
                        <svg width="24px" height="24px" viewBox="0 0 24 24"></svg>
                        <LikeButton />
                    </div>
                })}
            </div>
        </div>
    )
}

export default NewPosts