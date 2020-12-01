import React, { Component } from 'react';
import PlaylistListContext from '../../contexts/PlaylistListContext';
import PlaylistApiService from '../../services/playlist-api-service';
import PlaylistItem from '../../components/PlaylistItem/PlaylistItem';
import { Section } from '../../components/Utils/Utils';

export default class PlaylistListPage extends Component {
    static contextType = PlaylistListContext;

    componentDidMount() {
        this.context.clearError();
        PlaylistApiService.getPlaylists()
            .then(this.context.setPlaylistList)
            .catch(this.context.setError);
    };

    renderPlaylists() {
        const { playlistList = [] } = this.context;
        return playlistList.map(playlist =>
            <PlaylistItem key={playlist.id} playlist={playlist}/>);
    };

    render() {
        const { error } = this.context
        return (
            <Section list className='PlaylistListPage'>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.renderPlaylists()}
            </Section>
        );
    };
};