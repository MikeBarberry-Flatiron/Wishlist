import React from 'react'
import LikeButton from './LikeButton'

class RecentPosts extends React.Component {
    constructor() {
        super()
        this.state = {
            newPosts: []
        }
    }
    componentDidMount() {
        fetch('/recent')
        .then(res => res.json())
        .then(json => this.setState({
            newPosts: json.new_posts
        }))
    }
    render() {
        return(
            <div class="content">
                <h3 id="newContent">New Content</h3>
                <div className="newContentContainer">
                    {this.state.newPosts.map(post => {
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
}

export default RecentPosts