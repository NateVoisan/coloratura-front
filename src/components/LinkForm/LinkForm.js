import React, { Component } from 'react';
import PlaylistContext from '../../contexts/PlaylistContext';
import PlaylistApiService from '../../services/playlist-api-service';
import { Button, Input } from '../Utils/Utils';

export default class LinkForm extends Component {
    static contextType = PlaylistContext;

    static defaultProps = {
        link: "",
        title: "",
        artist: ""
    };

    handleSubmit = event => {
        console.log('should be submitting link');
        event.preventDefault();
        const { playlist } = this.context;
        const { link } = event.target;
        PlaylistApiService.postTrack(playlist.id, link.value)
            .then(this.context.addTrack)
            .then(() => {
                link.value = ''
            })
            .catch(this.context.setError);
    };

    render() {
        return (
            <PlaylistContext.Consumer>
                <div>
                    <form className='add-link'>
                        <div>
                            <label htmlFor="first-name"
                                onSubmit={(event) => this.handleSubmit(event)}
                            >Add link </label>
                            <Input
                                type="text"
                                name='link'
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
                            <Button type='submit'>Add</Button>
                        </div>
                    </form>
                </div>
            </PlaylistContext.Consumer>
        );
    };
};