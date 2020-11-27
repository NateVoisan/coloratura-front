import React, { Component } from 'react'

export default class YTMedia extends Component {

    // Grab the url, change part of it to be viable for embed code,
    // push the new url into the iframe embed code

    urlFix = () => {
        return this.props.track.link.replace(/watch\?v=/,'embed/')
    }
    
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
                    allowFullScreen>
                </iframe>
            </div>
            </div>
        )
    }
}