import React, { Component, useContext } from 'react'
import PlaylistListContext from '../../contexts/PlaylistListContext'
import PlaylistApiService from '../../services/playlist-api-service'
import PlaylistItem from '../../components/PlaylistItem/PlaylistItem'
import { Section } from '../../components/Utils/Utils'
import { Link, Redirect } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'


export default class PlaylistList extends Component {
    static defaultProps = {
        id: '',
        name: ''
    }

    static contextType = PlaylistListContext
    

    componentDidMount() {
        console.log(this.context)
        this.context.clearError()
        PlaylistApiService.getPlaylists()
            .then(this.context.setPlaylistList)
            .catch(this.context.setError)
    }

    // renderPlaylists() {
    //     const { playlistList = [] } = this.context
    //     return playlistList.map(playlist =>
    //         <PlaylistItem key={playlist.id} playlist={playlist}/>)
    // }


    render() {
        console.log("what ", this.context)
        return (
                <Section list className='PlaylistList'>
                    {/* <div>
                        {this.renderPlaylists()}
                    </div> */}
                    <div className='playlist-box' key={this.props.id}>
                        {this.props.name ?
                            <Link to="/playlist/:playlistId">
                                <h2>{this.props.name}</h2>
                            </Link>
                            : <Redirect to="/create">Create</Redirect>}
                    </div>
                </Section>
        )
    }
}