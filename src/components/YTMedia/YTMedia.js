import React, { Component } from 'react'

export default class YTMedia extends Component {

    
    render() {
        return (
            <div>
            <div className="YTMedia">
                <iframe 
                    width="560" 
                    height="315"
                    src={this.props.track.link}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; 
                           encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
            </div>
            </div>
        )
    }
}