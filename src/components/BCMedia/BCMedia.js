import React, { Component } from 'react'

export default class BCMedia extends Component {

    // Grab the url, change part of it to be viable for embed code,
    // push the new url into the iframe embed code

    urlFix = () => {
        return this.props.track.link.replace(/video/,'embed')
    }

    render() {
        console.log(this.props.track.link.replace(/video/,'embed'))
        return (
            <div className="BCMedia">
                <iframe 
                    // width="300"
                    // height="300"
                    title='Bitchute'
                    frameBorder='none'
                    src={this.urlFix()}>
                </iframe>
            </div>
        )
    }
}