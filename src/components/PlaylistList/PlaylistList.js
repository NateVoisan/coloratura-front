import React, { Component, useContext } from 'react'
import PlaylistListContext from '../../contexts/PlaylistListContext'
import PlaylistApiService from '../../services/playlist-api-service'
import PlaylistItem from '../../components/PlaylistItem/PlaylistItem'
import { Section } from '../../components/Utils/Utils'
import { Link, Redirect } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
// import playlistsRouter from '../../../../coloratura-back/src/playlists/playlists-router'


export default class PlaylistList extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            playlists: []
        }
    }


    // static contextType = PlaylistListContext

    componentDidMount() {
        // this.context.clearError()
        PlaylistApiService.getPlaylists()
            .then((playlists) => { this.setState({ ...this.state, playlists }) })
            .catch(e => console.log(e))
    }

    renderPlaylists() {
        return this.state.playlists.map(playlist =>
            <div key={playlist.id}>
                <Link to={`/playlist/${playlist.id}`}>
                    <h2>{playlist.name}</h2>
                </Link>
            </div>)
    }

    render() {
        console.log(this.state)
        return (
            <Section list className='PlaylistList'>
                <div>
                    {this.state.playlists ? this.renderPlaylists() : null}
                </div>
                <div className='playlist-box' key={this.state.id}>
                    {/* {this.state.playlists.length > 0 ?
                        // this.state.playlists.map(playlist => 
                        // <Link to="/playlists/:playlistId">
                        //     <h2>{playlist.name}</h2>
                        // </Link>)
                        "" : */}
                    <Link to="/create"><button>Create</button></Link>
                </div>
            </Section>
        )
    }
}