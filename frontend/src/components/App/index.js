/*
 *
 * App component
 *
 */

// Imports
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './style.css';
import ListOfMonths from '../ListOfMonths';
import GoogleLogin from '../GoogleLogin';

class App extends Component {
    state = {
        isFetching: false,
        isLogin: false, // Local Sotorage TCgId exist
        TCgId: null
    }

    componentDidMount() {
        // If local storage is not null
        if (localStorage.getItem('TCgId') !== null) {
            const TCgId = localStorage.getItem('TCgId');
            this.setState({ TCgId, isLogin: true, isFetching: false })
        } else {
            this.setState({ isFetching: false })
        }
    }

    render() {
        const { isFetching, TCgId } = this.state;
        return (
            <div className="App">
            {isFetching && <div>Loader</div>}
            {TCgId === null && !isFetching &&
             <header className="App-header">
             <div>
                 Training calendar
              <div>
                     <GoogleLogin />
                 </div>
             </div>
         </header>
            }
            {TCgId != null && !isFetching && <div>
                <header className="App-header-logged">
             <div>
                <GoogleLogin />
                </div></header>
                <ListOfMonths TCgId={TCgId} />
                </div>
                }
            </div>
        );
    }
}

export default App;