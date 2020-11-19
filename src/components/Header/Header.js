import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Hyph } from '../Utils/Utils'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-service'
import AuthContext from '../../contexts/AuthContext'
// import './Header.css'

export default class Header extends Component {
    handleSignOutClick = (auth) => {
        auth.setToken()
        TokenService.clearAuthToken()
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
    }

    renderSignOutLink(auth) {
        return (
            <div className='Header__signed-in'>
                <Link onClick={() => this.handleSignOutClick(auth)} to='/'>Sign Out</Link>
            </div>
        )
    }

    renderSignInLink() {
        return (
            <div className='Header__not-signed-in'>
                <Link to='/signup'>Sign Up</Link>
                <Hyph />
                <Link to='/signin'>Sign In</Link>
            </div>
        )
    }

    render() {
        return (
            <AuthContext.Consumer>
                {auth => (
                    <nav className='Header'>
                        <h1>
                            <Link to='/'>
                                {' '}
                        Coloratura
                    </Link>
                        </h1>
                        {auth.token
                            ? this.renderSignOutLink(auth)
                            : this.renderSignInLink()}
                    </nav>
                )}
            </AuthContext.Consumer>
        )
    }
}