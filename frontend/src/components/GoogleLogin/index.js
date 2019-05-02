import React, { Component } from 'react';
import './style.css';
import GoogleAuth from 'react-google-login';
import { config } from '../../frontendConfig';

class GoogleLogin extends Component {
    state = {
        user: null, processing: false
    }

    render() {
        const { user } = this.state;

        const responseGoogle = (response) => {
            if (response !== null) {
                console.log(response);
                this.setState({ user: response, processing: true });
            }
        }

        const logout = () => {
            if (user !== null) {
                this.setState({ user: null });
            }
        }

        return (
            <div>
                {user !== null
                    ? <div>Hello {user.profileObj.givenName}! <button onClick={logout}>Logout</button></div>
                    : <GoogleAuth
                        clientId={config.google}
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                }
            </div>
        )
    }
}

export default GoogleLogin;