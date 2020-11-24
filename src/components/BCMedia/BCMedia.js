import React, { Component } from 'react'

export default class BCMedia extends Component {

    urlFix = () => {
        return this.props.track.link.replace(/video/,'embed')
    }

    render() {
        console.log(this.props.track.link.replace(/video/,'embed'))
        return (
            <div className="BCMedia">
                {/* <iframe
                    width="640"
                    height="360"
                    scrolling="no"
                    frameborder="0"
                    style="border: none;"
                    title="Bitchute"
                    src={this.urlFix()}>
                </iframe> */}
                <iframe 
                    width="640"
                    height="360"
                    title='Bitchute'
                    src={this.urlFix()}>
                </iframe>
            </div>
        )
    }
}