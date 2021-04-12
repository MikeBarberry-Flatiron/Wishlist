import React, { Component } from 'react';

export default class SlidingImage extends Component {
    render() {
        return (
            <div class="slider">
                <span id="slide-1"></span>
                <span id="slide-2"></span>
                <span id="slide-3"></span>
                <div class="image-container">
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsupertalkradio.com%2Fwp-content%2Fuploads%2F2018%2F10%2Fforest-trees-sun.jpg" className="slide" width="500" height="300" alt="" />
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftalkshop.ph%2Fblog%2Fwp-content%2Fuploads%2F2014%2F07%2FSuper-Happy-People-yay-1024x640.jpg" className="slide" width="500" height="300" alt="" />
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F8%2F89%2FLos_Angeles%252C_Winter_2016.jpg%2F1200px-Los_Angeles%252C_Winter_2016.jpg" className="slide" width="500" height="300" alt="" />
                </div>
                <div class="buttons">
                    <a href="#slide-1"></a>
                    <a href="#slide-2"></a>
                    <a href="#slide-3"></a>
                </div>
            </div>
        )
    }
}