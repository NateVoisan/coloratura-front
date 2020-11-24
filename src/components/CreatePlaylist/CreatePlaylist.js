import React, { Component } from 'react'
import PlaylistApiService from '../../services/playlist-api-service'
import { Button, Input, Required } from '../Utils/Utils'
import AuthContext from '../../contexts/AuthContext'

export default class CreatePlaylist extends Component {
    // static defaultProps = {
    //     history: {
    //         push: () => { },
    //     },
    // }

    handleCreatePlaylist = (event, auth) => {
        event.preventDefault()
        const { playlist_name } = event.target
        const { history } = this.props
        PlaylistApiService.postPlaylist(playlist_name.value)
            .then((play) => {
                history.push(`/playlist/${play.id}`)
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        return (
            <AuthContext.Consumer>
                {auth => (
                    <div>
                        <header role="banner">
                        </header>

                        <section>
                            <h2>Create Playlist</h2>
                            <form className='signup-form' onSubmit={(event) => this.handleCreatePlaylist(event, auth)}>
                                <div>
                                    <label htmlFor="playlist_name">Name <Required /></label>
                                    <Input type="text" name='playlist_name' id='playlist_name' />
                                </div>
                                <Button 
                                    type='submit'
                                    >Submit</Button>
                            </form>
                        </section>
                    </div>
                )}
            </AuthContext.Consumer>
        )
    }
}