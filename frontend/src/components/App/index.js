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
import logo from '../../assets/logo-calendar.png';

class App extends Component {
    state = {
        isFetching: false,
        isLogin: false, // Local Sotorage TCgId exist
        TCgId: null,
        showDay: false,
        targetDay: null,
        refresh: false
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

    // Save to db and close the day editing panel
    saveDay = () => {
        if (localStorage.getItem('TCgId') !== null && document.getElementById("workout").checked) {
            const TCgId = localStorage.getItem('TCgId');
            const targetDateChanged = this.state.targetDay.replace(/\./g, "");

            fetch('http://localhost:3322/training',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "userid": TCgId,
                        "trainingdate": targetDateChanged,
                        "description": document.getElementById("description").value,
                        "other": ""
                    }
                })
                .then(response => response.json())
                .then(response => {

                    this.setState({ showDay: false });
                    this.refresh();
                    this.forceUpdate();
                });
        } else {
            // TODO: Some alert to confirm deleting...
            alert("Do you really want to delete it?");
            // Delete logic
        }
    }

    refresh = () => {
        this.setState({ refresh: true });
        this.setState({ refresh: false });
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
        const { isFetching, TCgId, showDay, targetDay, refresh } = this.state;
        return (
            <div className="App">
                {isFetching && <div>Loader</div>}
                {TCgId === null && !isFetching &&
                    <header className="App-header">
                        <div>
                            <img className="logo-welcome-page" src={logo} alt="logo" />
                            <p>Training calendar</p>
                            <div>
                                <p><GoogleLogin /></p>
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
                                <br />Workout? <input id="workout" type="checkbox"></input><br /><small>(unchecking delete this training)</small>
                                <br />Comment:<br /><textarea id="description"></textarea>
                                <br /><button onClick={this.saveDay}>Save</button>
                            </div>
                        </div>
                    }

                    <div onClick={this.showDay}>
                        {!refresh &&
                            <ListOfMonths TCgId={TCgId} />
                        }
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default App;