/*
 *
 * Component for logging in with Google
 *
 */

// Imports
import React, { Component } from 'react';
import './style.css';
import GoogleAuth from 'react-google-login';
import { config } from '../../components/Config';

class GoogleLogin extends Component {
    state = {
        givenName: null, gId: null, gImg: null, processing: false
    }

    componentDidMount() {
        // When local storage with Google ID exists, assign it to state
        if (localStorage.getItem('TCgId') !== null) {
            console.log("You are logged as " + localStorage.getItem('TCgivenName'));

            this.setState({
                givenName: localStorage.getItem('TCgivenName'),
                gId: localStorage.getItem('TCgId'),
                gImg: localStorage.getItem('TCgImg')
            });
        }
    }

    render() {
        const { givenName, gId, gImg } = this.state;

        const responseGoogle = (response) => {
            // If response from Google API is not null, create local storage with
            // name, Google ID and avatar (in local sotrage and in state)
            if (response !== null) {
                console.log(response);
                this.setState({
                    givenName: response.profileObj.givenName,
                    gId: response.profileObj.googleId,
                    gImg: response.profileObj.imageUrl
                });
                localStorage.setItem('TCgivenName', response.profileObj.givenName);
                localStorage.setItem('TCgId', response.profileObj.googleId);
                localStorage.setItem('TCgImg', response.profileObj.imageUrl);
            }

            // Redirecting, TODO: change to a different way
            window.location.href = "/";
        }

        const logout = () => {
            // If local storage with Google ID does not exist, remove local storage and state
            if (gId !== null) {
                this.setState({
                    givenName: null,
                    gId: null,
                    gImg: null
                });

                localStorage.removeItem('TCgivenName');
                localStorage.removeItem('TCgId');
                localStorage.removeItem('TCgImg');
            }

            // Redirecting, TODO: change it to a different way
            window.location.href = "/";
        }

        return (
            <div>
                {gId !== null
                    ?
                    <nav class="navbar navbar-expand-lg navbar-dark">
                        <a class="navbar-brand" href="#home">Training calendar</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item active">
                                    Hello {givenName}! <img src={gImg} alt="Google Avatar" width="30px" hight="30px" />
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#calendar">Show training calendar</a>
                                </li>
                                <li class="nav-item">
                                    <button onClick={logout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </nav>
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
