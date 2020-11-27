import TokenService from '../services/token-service'
import config from '../config'

const PlaylistApiService = {

    // Retrieve the playlists correlating to the current user

    getPlaylists() {
        return fetch(`${config.API_ENDPOINT}/playlists`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    // Retrieve one particular playlist for the specific user

    getPlaylist(playlistId) {
        return fetch(`${config.API_ENDPOINT}/playlist/${playlistId}`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    // Get all of the tracks for one particular playlist

    getPlaylistTracks(playlistId) {
        return fetch(`${config.API_ENDPOINT}/playlist/${playlistId}/tracks`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    // Post the new tracks data to the database for the user

    postTrack(playlistId, link, title, artist) {
        return fetch(`${config.API_ENDPOINT}/tracks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                playlist_id: playlistId,
                link,
                title,
                artist
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    // Post the new playlist data to the databse for the user

    postPlaylist(name) {
        return fetch(`${config.API_ENDPOINT}/playlists/create/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                name
            })
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    }
}

export default PlaylistApiService