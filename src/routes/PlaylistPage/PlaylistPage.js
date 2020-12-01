import React, { Component } from 'react';
import PlaylistContext, { nullPlaylist } from '../../contexts/PlaylistContext';
import PlaylistApiService from '../../services/playlist-api-service';
import { Hyph, Section } from '../../components/Utils/Utils';

export default class PlaylistPage extends Component {
    static defaultProps = {
        match: { params: {} },
    };

    static contextType = PlaylistContext;

    componentDidMount() {
        const { playlistId } = this.props.match.params;
        this.context.clearError();
        PlaylistApiService.getPlaylist(playlistId)
            .then(this.context.setPlaylist)
            .catch(this.context.setError)
        PlaylistApiService.getPlaylistTracks(playlistId)
            .then(this.context.setTracks)
            .catch(this.context.setError)
    };
    
    componentWillUnmount() {
        this.context.clearPlaylist()
    };

    renderPlaylist() {
        const { playlist, tracks } = this.context;
        return <>
            <h2>{playlist.name}</h2>
            <p>
                {playlist.creator.id && <>
                <Hyph />
                <PlaylistCreator creator={playlist.creator} />
                </>}
                <Hyph />
            </p>
            <PlaylistContent playlist={playlist} />
            <PlaylistTracks tracks={tracks} />
        </>
    };

    render() {
        let content
        content = this.renderPlaylist() 
        return (
            <Section className='PlaylistPage'>
                {content}
            </Section>
        );
    };
};

function PlaylistCreator({ playlist = nullPlaylist }) {
    return (
        <span className='PlaylistPage__creator'>
            {playlist.creator.user_name}
        </span>
    );
};

function PlaylistContent({ playlist }) {
    return (
        <p className='PlaylistPage__content'>
            {playlist.content}
        </p>
    );
};

function PlaylistTracks({ tracks = [] }) {
    return (
        <ul className='PlaylistPage__tracks-list'>
            {tracks.map(track =>
                <li key={track.id} className='PlaylistPage__track'>
                    <p className='PlaylistPage__track-text'>
                        {track.link}
                    </p>
                </li>
                )}
        </ul>
    );
};