import React, { Component } from 'react'

export default class PlaylistItem extends Component {
    static defaultProps = {
        title: '',
        artist: '',
        id: ''
    }

    render() {
        return (
            <div>
                <fieldset className='track-box' key={this.props.track.id}>
                    <p>{this.props.track.title}</p>
                    {this.props.track.artist ? <p>by {this.props.track.artist}</p> : null}
                    <button className="up" onClick={this.props.moveUp}>▲</button>
                    <button className="dowm" onClick={this.props.moveDown}>▼</button>
                    <button onClick={this.props.remove}>Delete</button>
                </fieldset>
            </div>
        )
    }
}