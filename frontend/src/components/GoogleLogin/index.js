import React, { Component } from 'react';
import './style.css';
import GoogleAuth from 'react-google-login';
import { config } from '../../frontendConfig';

class GoogleLogin extends Component {
    state = {
        givenName: null, gId: null, gImg: null, processing: false
    }

    componentDidMount() {
        if(localStorage.getItem('TCgId') !== null) {
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

            window.location.href = "/";
        }

        const logout = () => {
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

            window.location.href = "/";
        }

        return (
            <div>
                {gId !== null
                    ? <div>Hello {givenName} <img src={gImg} alt="Google Avatar" width="30px" hight="30px" />!
                    <br/><a href="#calendar">Show training calendar</a>
                    <br/><button onClick={logout}>Logout</button></div>
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