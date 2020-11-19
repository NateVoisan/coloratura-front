import React, { Component } from 'react'

export const nullPlaylist = {
    creator: {},
    tags: [],
}

const PlaylistContext = React.createContext({
    id: null,
    playlist: nullPlaylist,
    tracks: [],
    selectedTrack: 0,
    error: null,
    setError: () => {},
    clearError: () => {},
    setPlaylist: () => {},
    clearPlaylist: () => {},
    setTracks: () => {},
    addTrack: () => {},
    clearTrack: () => {},
    changePlaces: () => {}
})

export default PlaylistContext

export class PlaylistProvider extends Component {
    state = {
        playlist: nullPlaylist,
        tracks: [],
        error: null,
        selectedTrack: 0
    };

    setID = id => {
        this.setState({ id })
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    setPlaylist = playlist => {
        this.setState({ playlist })
    }

    setTracks = tracks => {
        this.setState({ tracks })
    }

    setSelectedTrack = (selectedTrack) => {
        this.setState({ selectedTrack })
    }

    clearPlaylist = () => {
        this.setPlaylist(nullPlaylist)
        this.setTracks([])
    }

    clearTrack = (id) => {
        this.setState({ tracks: this.state.tracks.filter(track => id !== track.id) })
    }

    changePlaces(pos, dir) {
        console.log(pos, " ", dir, " changing places");
        var tempTrackList = this.state.tracks;
        var tempTrack = this.state.tracks[pos];
        tempTrackList[pos] = this.state.tracks[pos + dir];
        tempTrackList[pos + dir] = tempTrack;
        this.setState({ tracks: tempTrackList })
      }

    addTrack = track => {
        this.setTracks([
            ...this.state.tracks,
            track
        ])
    }

    render() {
        const value = {
            playlist: this.state.playlist,
            tracks: this.state.tracks,
            selectedTrack: this.state.selectedTrack,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setPlaylist: this.setPlaylist,
            setTracks: this.setTracks,
            clearPlaylist: this.clearPlaylist,
            addTrack: this.addTrack,
            clearTrack: this.clearTrack,
            setSelectedTrack: this.setSelectedTrack,
            changePlaces: this.changePlaces
        }
        return (
            <PlaylistContext.Provider value={value}>
                {this.props.children}
            </PlaylistContext.Provider>
        )
    }
}