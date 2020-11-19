import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service.js'
import { Button, Input } from '../Utils/Utils'

export default class SignIn extends Component {
    static defaultProps = {
        onSigninSuccess: () => { }
    }

    state = { error: null }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { user_name, password } = ev.target
        AuthApiService.postSignin({
            user_name: user_name.value,
            password: password.value,
        })
            .then(res => {
                user_name.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                this.props.onSigninSuccess(res.authToken)
            })
            .catch(res => {
                this.setState({ error: res.error })
                console.log("an error has occurred ", res.error)
            })
    }
    render() {
        const { error } = this.state
        return (
            <div>
                <section>
                    <h2>Sign In</h2>
                    <form className='signin-form' onSubmit={this.handleSubmitJwtAuth}>
                        <div role='alert'>
                            {error && <p className='red'>{error}</p>}
                        </div>
                        <div>
                            <label htmlFor="signin-username">Username</label>
                            <Input 
                                type="text" 
                                name='user_name' 
                                id='signin-username' 
                                required />
                        </div>
                        <div>
                            <label htmlFor="signin-password">Password</label>
                            <Input 
                                type="password" 
                                name='password' 
                                id='signin-password' 
                                required />
                        </div>
                        <Button type='submit'>Submit</Button>
                    </form>
                </section>
            </div >
        );
    }
}