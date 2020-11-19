import config from '../config'
import TokenService from '../services/token-service'
import IdleService from './idle-service'

const AuthApiService = {
  postSignin({user_name, password}) {
    console.log(user_name, password)
    return fetch(`${config.API_ENDPOINT}/auth/signin`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({user_name, password}),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(res => {
        console.log('saving token')
        TokenService.saveAuthToken(res.authToken)
        IdleService.registerIdleTimerResets()
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken()
        })
        return res
      })
  },

  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postRefreshToken() {
    return fetch(`${config.API_ENDPOINT}/refresh`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
        )
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken()
        })
        return res
      })
      .catch(err => {
        console.log('refresh token request error')
        console.log(err)
      })
  }
}

export default AuthApiService