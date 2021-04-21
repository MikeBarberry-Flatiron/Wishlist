import React from 'react'

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
                            <svg width="24px" height="24px" viewBox="0 0 24 24"><svg id="external_link" class="icon_svg-stroke" stroke="#666" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 13.5 17 19.5 5 19.5 5 7.5 11 7.5"></polyline><path d="M14,4.5 L20,4.5 L20,10.5 M20,4.5 L11,13.5"></path></svg></svg>
                            <p>{post.description}</p>
                </div>
                    })}
            </div>
        </div>
        )
    }
}

export default RecentPosts