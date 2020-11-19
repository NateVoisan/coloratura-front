import TokenService from '../services/token-service'
import config from '../config'

const PlaylistApiService = {
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
    postTrack(playlistId, link) {
        return fetch(`${config.API_ENDPOINT}/tracks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                playlist_id: playlistId,
                link
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
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