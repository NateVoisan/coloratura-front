import React, { Component } from 'react'
import PlaylistItem from '../PlaylistItem/PlaylistItem.js'
import YTMedia from '../YTMedia/YTMedia.js'
import { Input, Button,Required } from '../Utils/Utils'
import PlaylistApiService from '../../services/playlist-api-service.js'
import BCMedia from '../BCMedia/BCMedia.js'
import config from '../../config'
import TokenService from '../../services/token-service'

export default class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      playlist: {
        name: ''
      },
      link: '',
      title: '',
      artist: '',
      tracks: [],
      selectedTrack: 0
    }
  }

  static defaultProps = {
    id: '',
    name: ''
  }

  // handle (arrow movement) (skip -forward/backward) (delete track) 
  // (replace iframe link = {this.props.selectedTrack.link}) (autoplay)
  // handle (next track) (determine youtube or soundcloud and switch embed)

  // Get the data correlating to the selected playlist on did mount

  componentDidMount() {
    PlaylistApiService.getPlaylist(this.props.match.params.playlistId)
      .then((playlist) => {
        this.getTracks()
        this.setState({ playlist })
      })
      .catch(e => console.log("error catch ", e))
  }

  // Get the tracks for the selected playlist

  getTracks() {
    PlaylistApiService.getPlaylistTracks(this.props.match.params.playlistId)
      .then((tracks) => {
        this.setState({ tracks })
      })
      .catch(e => console.log("error catch ", e))
  }

  // Render the correlating media type for the link

  renderMedia() {
    let service = ""
    let currentTrack = this.state.tracks[this.state.selectedTrack]
    if (currentTrack) {
      if (currentTrack.link.includes("youtube")) {
        service = "youtube"
      } else if (currentTrack.link.includes("bitchute")) {
        service = "bitchute"
      } else {
        service = "nosupport"
      }
    }
    switch(service) {
      case "youtube":
        return <YTMedia track={currentTrack} />
      case "bitchute":
        return <BCMedia track={currentTrack} />
      case "nosupport":
        return <p>this media type is not supported</p>
      default:
        return <p>this media type is not supported</p>
    }
  }

  // Give selected track a number to be used in state

  selectTrack(trackNumber) {
    this.setState({ selectedTrack: trackNumber})
  }

  // Handle deleting a track and its data from both the state and the database

  deleteTrack = (id) => {
    let newTracks = [...this.state.tracks]
    newTracks = newTracks.filter(track => track.id !== id)
    fetch(`${config.API_ENDPOINT}/playlists/deletetrack/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(() => {
        this.setState({ tracks: newTracks })
      })
      .catch(err => console.log(err))
  }

  // Render the individual tracks data into a list item component

  renderTracks() {
    var allTracks = [];
    for (let i = 0; i < this.state.tracks.length; i++) {
      var track = this.state.tracks[i];
      allTracks.push(
        <PlaylistItem
          key={i}
          track={track}
          delete={(id) => this.deleteTrack(id)}
          id={this.state.tracks[i].id}
          select={() => this.selectTrack(i)}
        />);
    }
    return (
      <div className="tracks">
        {allTracks}
      </div>
    )
  }

  // Handle submitting a new tracks data to both the state and the database

  handleSubmitNewTrack = (ev) => {
    ev.preventDefault();

    const { history } = this.state

    var newTrack = {
      title: this.state.title,
      artist: this.state.artist,
      link: this.state.link
    }

    this.setState({ link: '', title: '', artist: '' })
    ev.target.link.value = ''
    ev.target.title.value = ''
    ev.target.artist.value = ''

    PlaylistApiService.postTrack(this.props.match.params.playlistId, newTrack.link, newTrack.title, newTrack.artist)
      .then((play) => {
        history.push(`/playlist/${play.id}}`)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })

    if (newTrack.link != null) {
      var tempTrackList = this.state.tracks;
      tempTrackList.push(newTrack);
      this.setState({ tracks: tempTrackList });
    }
  }

  handleChange = (ev) => {
    ev.preventDefault();
    var variable = ev.target.name;
    this.setState({ ...this.state, [variable]: ev.target.value })
  }

  render() {
    return (
      <div key={this.props.match.params.playlistId}>
        <h2 className='PlaylistListItem__heading'>{this.state.playlist.name}</h2>
        {this.renderMedia()}
        <section>
          {this.renderTracks()}
        </section>
        <div>
          <form className='add-link' onSubmit={this.handleSubmitNewTrack}>
            <div>
              <label htmlFor="link">Link <Required /></label>
              <Input
                type="text"
                name='link'
                id='link'
                required
                value={this.state.link}
                onChange={this.handleChange}
              />
              <label htmlFor="title"> Title <Required /></label>
              <Input
                type="text"
                name='title'
                id='title'
                required
                value={this.state.title}
                onChange={this.handleChange}
              />
              <label htmlFor="artist"> Artist <Required /></label>
              <Input
                type="text"
                name='artist'
                id='artist'
                required
                value={this.state.artist}
                onChange={this.handleChange}
              />
              <Button type='submit'>Add</Button>
            </div>
          </form>
        </div>
        <footer className='footer'>
          <p>© Coloratura</p>
        </footer>
      </div>
    )
  }
}