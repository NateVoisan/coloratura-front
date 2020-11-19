import React, { Component } from 'react'

export default class BCMedia extends Component {


    render() {
        return (
            <div className="BCMedia">
                <iframe
                    width="640"
                    height="360"
                    scrolling="no"
                    frameborder="0"
                    style="border: none;"
                    src={this.props.track.link}>
                </iframe>
            </div>
        )
    }
}