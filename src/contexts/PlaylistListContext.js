import React, { Component } from 'react'

const PlaylistListContext = React.createContext({
    playlistList: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setPlaylistList: () => {},
})

export default PlaylistListContext

export class PlaylistListProvider extends Component {
    state = {
        playlistList: [],
        error: null,
    };

    setPlaylistList = playlistList => {
        this.setState({ playlistList })
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    render() {
        const value = {
            playlistList: this.state.playlistList,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setPlaylistList: this.setPlaylistList,
        }
        return (
            <PlaylistListContext.Provider value={value}>
                {this.props.children}
            </PlaylistListContext.Provider>
        )
    }
}