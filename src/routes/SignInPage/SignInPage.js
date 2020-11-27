import React, { Component } from 'react'
import SignIn from '../../components/SignIn/SignIn'
import { Section } from '../../components/Utils/Utils'
import AuthContext from '../../contexts/AuthContext'

export default class SignInPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    // Handle receiving the correct auth token for sign in success

    handleSignInSuccess = (auth, token) => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/'
        history.push(destination)
        auth.setToken(token)
    }

    render() {
        return (
            <AuthContext.Consumer>
                {(auth) => (
                    <Section className='SignInPage'>
                        <SignIn onSigninSuccess={(token) => this.handleSignInSuccess(auth, token)} />
                    </Section>
                )}
            </AuthContext.Consumer>
        )
    }
}