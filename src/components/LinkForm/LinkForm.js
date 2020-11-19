import React, { Component } from 'react'
import PlaylistContext from '../../contexts/PlaylistContext'
import PlaylistApiService from '../../services/playlist-api-service'
import { Button, Input } from '../Utils/Utils'

export default class LinkForm extends Component {
    static contextType = PlaylistContext

    static defaultProps = {
        link: "",
        title: "",
        artist: ""
    }

    // handleSubmit = ev => {
    //     ev.preventDefault()
    //     const { playlist } = this.context
    //     const { link } = ev.target
    //     PlaylistApiService.postTrack(playlist.id, link.value)
    //         .then(this.context.addTrack)
    //         .then(() => {
    //             link.value = ''
    //         })
    //         .catch(this.context.setError)
    // }

    handleSubmit = ev => {
        ev.preventDefault();
        console.log("event ", ev);
        this.props.handleSubmitNewTrack("name", "name", "name");
    }

    render() {
        return (
            <div>
                <form className='add-link'>
                    <div>
                        <label htmlFor="first-name">Add link </label>
                            <Input 
                                type="text" 
                                name='link' 
                                placeholder='https://www.youtube.com' 
                                id='link' 
                                required
                            />
                        <label htmlFor="first-name"> Title </label>
                            <Input 
                                type="text" 
                                name='title' 
                                id='title' 
                            />
                        <label htmlFor="first-name"> Artist </label>
                            <Input 
                                type="text" 
                                name='artist' 
                                id='artist' 
                            />
                        <Button type='submit' onClick={this.handleSubmit}>Add</Button>
                    </div>
                </form>
            </div>
        )
    }



}