import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Hyph } from '../Utils/Utils'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-service'
import AuthContext from '../../contexts/AuthContext'
// import './Header.css'

export default class Header extends Component {

    // On sign out click handle clearing token

    handleSignOutClick = (auth) => {
        auth.setToken()
        TokenService.clearAuthToken()
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
    }

    // Render sign out link when already signed in

    renderSignOutLink(auth) {
        return (
            <div className='Header__signed-in'>
                <Link 
                    onClick={() => this.handleSignOutClick(auth)} 
                    to='/' 
                    style={{textDecoration:'none'}}
                    >Sign Out</Link>
            </div>
        )
    }

    // Render sign up and sign in links when not signed in

    renderSignInLink() {
        return (
            <div className='Header__not-signed-in'>
                <Link 
                    to='/signup' 
                    style={{textDecoration:'none'}}
                    >Sign Up</Link>
                <Hyph />
                <Link 
                    to='/signin'
                    style={{textDecoration:'none'}}
                    >Sign In</Link>
            </div>
        )
    }

    // Render home link only when not on home page already

    renderHomeLink() {
        return (
            <h1>
                <Link 
                    to='/'
                    style={{textDecoration:'none'}}>
                        {' '}
                        Coloratura
                </Link>
            </h1>)
    }

    render() {
        return (
            <AuthContext.Consumer>
                {auth => (
                    <header className='App__header'>
                    <nav className='Header'>
                        {this.props.location.pathname === '/' 
                            ? <h1 className="headerhome">Coloratura</h1> 
                            : this.renderHomeLink()}
                        {auth.token
                            ? this.renderSignOutLink(auth)
                            : this.renderSignInLink()}
                    </nav>
                    </header>
                )}
            </AuthContext.Consumer>
        )
    }
}