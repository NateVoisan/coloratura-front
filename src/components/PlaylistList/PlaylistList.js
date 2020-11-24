import React, { Component } from 'react'
import PlaylistApiService from '../../services/playlist-api-service'
import { Link } from 'react-router-dom'
import PlaylistContext from '../../contexts/PlaylistContext';
import config from '../../config'
import TokenService from '../../services/token-service'

export default class PlaylistList extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            playlists: []
        }
    }

    componentDidMount() {
        // this.context.clearError()
        PlaylistApiService.getPlaylists()
            .then((playlists) => {
                this.setState({ ...this.state, playlists })
            })
            .catch(e => console.log(e))
    }

    onDelete = (id) => {
        fetch(`${config.API_ENDPOINT}/playlists/deleteplaylist/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(() => {
                let newPlaylist = [...this.state.playlists]
                newPlaylist = newPlaylist.filter(play => play.id !== id)
                this.setState({ playlists: newPlaylist })
            })
            .catch(err => { console.log(err) })
    }

    renderPlaylists() {
        return this.state.playlists.map(playlist =>
            <fieldset key={playlist.id}>
                <div key={playlist.id}>
                    <Link
                        to={`/playlist/${playlist.id}`}
                        key={playlist.id}
                        playlist={playlist}
                        style={{ textDecoration: 'none' }}>
                        <h2>{playlist.name}</h2>
                    </Link>
                    <button type='delete' onClick={() => this.onDelete(playlist.id)}>Delete</button>
                </div></fieldset>)
    }

    render() {
        const value = {
            id: this.state.id,
            name: this.state.name
        }
        return (
            <PlaylistContext.Provider value={value} key={this.state.id}>
                <div className='playlist-box' key={this.state.id}>
                    {this.state.playlists ? this.renderPlaylists() : null}
                    <Link to="/create"><button>Create</button></Link>
                </div>
                <footer className='footer'>
                    <p>© Coloratura</p>
                </footer>
            </PlaylistContext.Provider>
        )
    }
}