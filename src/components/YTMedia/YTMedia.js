import React, { Component } from 'react'

export default class YTMedia extends Component {

    urlFix = () => {
        return this.props.track.link.replace(/watch\?v=/,'embed/')
    }

    // let url='https://www.youtube.com/watch?v=412PXDDP31g';
    // let parsed = url.replace(/watch\?v=/,'embed/');
    // "https://www.youtube.com/embed/412PXDDP31g"
    
    render() {
        return (
            <div>
            <div className="YTMedia">
                <iframe 
                    width="560" 
                    height="315"
                    title="Youtube"
                    src={this.urlFix()}
                    frameBorder="0"
                    // allow="accelerometer; autoplay; clipboard-write; 
                    //        encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
            </div>
            </div>
        )
    }
}