import React, { Component } from 'react';
import TokenService from '../services/token-service';

const AuthContext = React.createContext({
    token: TokenService.getAuthToken(),
    setToken: () => {}
});

export default AuthContext

export class AuthProvider extends Component {
    state = {
        token: TokenService.getAuthToken(),
    };

    setToken = token => {
        this.setState({ token })
    };

    render() {
        const value = {
            setToken: this.setToken,
            token: this.state.token
        };
        return (
            <AuthContext.Provider value={value}>
                {this.props.children}
            </AuthContext.Provider>
        );
    };
};