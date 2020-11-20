import React, { Component } from 'react'
import PlaylistItem from '../PlaylistItem/PlaylistItem.js'
import YTMedia from '../YTMedia/YTMedia.js'
import SCMedia from '../SCMedia/SCMedia.js'
import { Input, Button } from '../Utils/Utils'
import PlaylistContext from '../../contexts/PlaylistContext.js'
import PlaylistApiService from '../../services/playlist-api-service.js'
import BCMedia from '../BCMedia/BCMedia.js'
import PlaylistPage from '../../routes/PlaylistPage/PlaylistPage.js'

export default class Playlist extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     link: '',
  //     title: '',
  //     artist: '',
  //     tracks: [
  //       {
  //         id: '',
  //         title: 'cranberry',
  //         artist: 'scone',
  //         service: 'soundcloud',
  //         link: 'https://www.youtube.com/embed/HmfJqm9P7Ks'
  //       },
  //       {
  //         id: '',
  //         title: 'tea',
  //         artist: 'sugar',
  //         service: 'youtube',
  //         link: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/913401445&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true'
  //       },
  //       {
  //         id: '',
  //         title: 'thai',
  //         artist: '',
  //         service: 'soundcloud',
  //         link: 'https://soundcloud.com/feelmybicep/bicep-atlas'
  //       }],
  //     selectedTrack: 0
  //   }
  // }

  static defaultProps = {
    id: '',
    name: '',
  }

  // handle (arrow movement) (skip -forward/backward) (delete track) 
  // (replace iframe link = {this.props.selectedTrack.link}) (autoplay)
  // handle (next track) (determine youtube or soundcloud and switch embed)

  componentDidMount() {
    console.log(this.context)
    PlaylistApiService.getPlaylistTracks(this.props.match.params.playlistId)
      .then(tracks => {
        console.log(tracks)
      })
  }

  renderMedia(currentTrack) {
    switch (currentTrack.service) {
      case 'youtube':
        return <YTMedia track={currentTrack} />;
      case 'soundcloud':
        return <SCMedia track={currentTrack} />;
      case 'bitchute':
        return <BCMedia track={currentTrack} />;
      default:
        break;
    }
  }

  renderTracks(tracks, clearTrack, changePlaces) {
    console.log("rendering tracks");
    var allTracks = [];
    for (let i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      allTracks.push(
        <PlaylistItem
          key={i}
          track={track}
          remove={() => clearTrack(this.track.id)}
          moveUp={() => changePlaces(i, -1)}
          moveDown={() => changePlaces(i, 1)}
        />);
    }
    return (
      <div className="tracks">
        {allTracks}
      </div>
    )
  }

  handleSubmitNewTrack = (ev) => {
    ev.preventDefault();
    const { history } = this.props
    var newTrack = {
      title: this.props.title,
      artist: this.props.artist,
      link: this.props.link
    }

    PlaylistApiService.postTrack(newTrack.link)
      .then((play) => {
        history.push(`/playlist/${play.id}}`)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })

    // if (newTrack.link.includes('youtube')) {
    //   newTrack.link = newTrack.link.replace('watch?v=', 'embed/')
    // }

    // if (newTrack.link.includes('bitchute')) {
    //   newTrack.link = newTrack.link.replace('video', 'embed')
    // }

    if (newTrack.link != null) {
      var tempTrackList = this.props.tracks;
      tempTrackList.push(newTrack);
      this.setState({ ...this.props, tracks: tempTrackList });
    }
  }

  handleChange = (ev) => {
    ev.preventDefault();
    var variable = ev.target.name;
    this.setState({ ...this.props, [variable]: ev.target.value })
  }

  render() {
    
    return (
      <PlaylistContext.Consumer>
        {playlist => {
          let media = (<></>)
          let trax = (<></>)
          if (playlist.tracks.length > 0) {
            media = this.renderMedia(playlist.tracks[playlist.selectedTrack])
            trax = this.renderTracks(playlist.tracks, playlist.clearTrack, playlist.changePlaces)
          }
          return (
          <div>
            <h2 className='PlaylistListItem__heading'>{this.props.name}</h2>
            <PlaylistPage match={this.props.match} ></PlaylistPage>
            <section>
                {media}
                {trax}
              <div>
                <form className='add-link' onSubmit={this.handleSubmitNewTrack}>
                  <div>
                    <label htmlFor="link">Add link </label>
                    <Input
                      type="text"
                      name='link'
                      id='link'
                      required
                      value={this.props.link}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="title"> Title </label>
                    <Input
                      type="text"
                      name='title'
                      id='title'
                      value={this.props.title}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="artist"> Artist </label>
                    <Input
                      type="text"
                      name='artist'
                      id='artist'
                      value={this.props.artist}
                      onChange={this.handleChange}
                    />
                    <Button type='submit'>Add</Button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        )}}
      </PlaylistContext.Consumer>
    )
  }
}

Playlist.contextType = PlaylistContext