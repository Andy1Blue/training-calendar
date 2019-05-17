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
        TCgId: null,
        showDay: false,
        targetDay: null
    }

    // Show the day editing panel
    showDay = (e) => {
        if (e.target.attributes.getNamedItem('id') !== null) {
            console.log("Clicked" + e.target.attributes.getNamedItem('id').value);
            this.setState({ showDay: true, targetDay: e.target.attributes.getNamedItem('id').value });
        }
    }

    // Close the day editing panel
    closeDay = () => {
        this.setState({ showDay: false });
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
        const { isFetching, TCgId, showDay, targetDay } = this.state;
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
                    <div>
                        <GoogleLogin />
                    </div>

                    {showDay &&
                        <div id="red-toast">
                            <div>
                                <button id="red-toast-close" onClick={this.closeDay}>x</button>
                                Day: {targetDay}
                                <br />Workout? <input type="checkbox"></input>
                                <br />Comment:<br /><textarea></textarea>
                                <br /><button>Save</button>
                            </div>
                        </div>
                    }

                    <div onClick={this.showDay}>
                        <ListOfMonths TCgId={TCgId} />
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default App;