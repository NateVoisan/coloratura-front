// import logo from './logo.svg';
// import PlaylistItem from './components/PlaylistItem/PlaylistItem.js';
// import SignIn from './components/SignIn/SignIn.js';
// import SignUp from './components/SignUp/SignUp.js';
// import PrivateRoute from './components/Utils/PrivateRoute'
// import PublicOnlyRoute from './components/Utils/PublicOnlyRoute'
// import PlaylistPage from './routes/PlaylistPage/PlaylistPage'
// import PlaylistListPage from './routes/PlaylistListPage/PlaylistListPage'
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home/Home.js';
import Playlist from './components/Playlist/Playlist.js';
import CreatePlaylist from './components/CreatePlaylist/CreatePlaylist';
import Header from './components/Header/Header';
import PlaylistList from './components/PlaylistList/PlaylistList'
import SignUpPage from './routes/SignUpPage/SignUpPage'
import SignInPage from './routes/SignInPage/SignInPage'
import NotFoundPage from './routes/NotFoundPage/NotFoundPage'
import AuthApiService from './services/auth-api-service'
import TokenService from './services/token-service'
import IdleService from './services/idle-service'
import { AuthProvider } from './contexts/AuthContext'
import { PlaylistProvider } from './contexts/PlaylistContext';
import { PlaylistListProvider } from './contexts/PlaylistListContext';

class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
    IdleService.setIdleCallback(this.signoutFromIdle)

    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken()
      })
    }
  }

  // componentDidMount() {
  //   IdleService.unRegisterIdleResets()
  //   TokenService.clearCallbackBeforeExpiry()
  // }

  signoutFromIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.forceUpdate()
  }

  reRender = () => {
    this.forceUpdate()
  }

  render() {
    console.log("app location")
    return (
      <AuthProvider>
        <PlaylistListProvider>
          <PlaylistProvider>
            <div className='App'>
                <Route path="/" component={Header} />
              <main role="main">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/signin" component={SignInPage} />
                  <Route exact path="/signup" component={SignUpPage} />
                  <Route exact path="/create" component={CreatePlaylist} />
                  <Route exact path="/playlists" component={PlaylistList} />
                  <Route exact path="/playlist/:playlistId" component={Playlist} />
                  <Route component={NotFoundPage} />
                </Switch>
              </main>
            </div>
          </PlaylistProvider>
        </PlaylistListProvider>
      </AuthProvider>
    );
  }
}

export default App;
