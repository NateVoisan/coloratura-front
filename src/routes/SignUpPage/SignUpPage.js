import React, { Component } from 'react'
import SignUp from '../../components/SignUp/SignUp'
import { Section } from '../../components/Utils/Utils'
import AuthContext from '../../contexts/AuthContext'

export default class SignUpPage extends Component {
    static defaultProps = {
        history: {
            push: () => { },
        },
    }

    // Handle receiving the correct auth token for sign in success

    handleSignUpSuccess = (auth, token) => {
        const { history } = this.props
        auth.setToken(token)
        history.push('/playlists')
    }

    render() {
        return (
            <AuthContext.Consumer>
                {(auth) => (
                    <Section className='SignUpPage'>
                        <SignUp onSignUpSuccess={(token) => this.handleSignUpSuccess(auth, token)} />
                    </Section>
                )}
            </AuthContext.Consumer>
        )
    }
}