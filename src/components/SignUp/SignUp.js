import React, { Component } from 'react'
import { Button, Input, Required } from '../Utils/Utils'
import AuthApiService from '../../services/auth-api-service'
import AuthContext from '../../contexts/AuthContext'

export default class SignUp extends Component {
    static defaultProps = {
        onSignUpSuccess: () => { }
    }

    state = { error: null }

    handleSubmit = (ev, auth) => {
        ev.preventDefault()
        const { user_name, password } = ev.target
        console.log(user_name.value, password.value)
        const user = {
            user_name: user_name.value,
            password: password.value
        }
        this.setState({ error: null })
        AuthApiService.postUser(user)
            .then(data => {
                user_name.value = ''
                password.value = ''
                AuthApiService.postSignin(user)
                    .then(res => {
                        console.log('signup success')
                        auth.setToken(res.authToken)
                        console.log(this.props)
                        this.props.onSignUpSuccess(res.authToken)
                    })
                    .catch(res => {
                        this.setState({ error: res.error })
                    })
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <AuthContext.Consumer>
                {auth => (
                    <div>
                        <div role='alert'>
                            {error && <p className='red'>{error}</p>}
                        </div>
                        <section>
                            <h2>Sign Up</h2>
                            <form className='signup-form' onSubmit={(event) => this.handleSubmit(event, auth)}>
                                <div>
                                    <label htmlFor="signup-username">Username <Required /></label>
                                    <Input
                                        type="text"
                                        name='user_name'
                                        id='signup-username'
                                        required />
                                </div>
                                <div>
                                    <label htmlFor="signup-password">Password <Required /></label>
                                    <Input
                                        type="password"
                                        name='password'
                                        id='signup-password'
                                        required />
                                </div>
                                <Button type='submit'>Submit</Button>
                            </form>
                        </section>
                    </div>
                )}
            </AuthContext.Consumer>
        );
    }
}