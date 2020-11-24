import React, { Component } from 'react'

export default class PlaylistItem extends Component {
    static defaultProps = {
        title: '',
        artist: '',
        id: ''
    }

    // <button className="up" onClick={this.props.moveUp}>▲</button>
    // <button className="dowm" onClick={this.props.moveDown}>▼</button>

    render() {
        return (
            <div onClick={this.props.select}>
                <fieldset className='track-box' key={this.props.track.id}>
                    <a href={this.props.track.link}>{this.props.track.title}</a>
                    {/* <p>{this.props.track.title}</p> */}
                    {this.props.track.artist ? <p>by {this.props.track.artist}</p> : null}
                    <button onClick={() => this.props.delete(this.props.id)}>Delete</button>
                </fieldset>
            </div>
        )
    }
}