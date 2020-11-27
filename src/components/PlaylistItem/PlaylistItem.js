import React, { Component } from 'react'

export default class PlaylistItem extends Component {
    static defaultProps = {
        title: '',
        artist: '',
        id: ''
    }

    // Template for a track item on the page

    render() {
        return (
            <div onClick={this.props.select}>
                <fieldset className='track-box' key={this.props.track.id}>
                    <a href={this.props.track.link}>{this.props.track.title}</a>
                    {this.props.track.artist ? <p>by {this.props.track.artist}</p> : null}
                    <button onClick={() => this.props.delete(this.props.id)}>Delete</button>
                </fieldset>
            </div>
        )
    }
}