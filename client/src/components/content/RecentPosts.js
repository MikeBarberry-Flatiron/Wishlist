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
            <h1></h1>
        )
    }
}

export default RecentPosts