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
        refresh: false,
        targetDayTId: null
    }

    // Show the day editing panel
    showDay = (e) => {
        if (e.target.attributes.getNamedItem('id') !== null) {
            if (e.target.attributes.getNamedItem('trainingId')) {
                this.setState({ showDay: true, targetDay: e.target.attributes.getNamedItem('id').value, targetDayTId: e.target.attributes.getNamedItem('trainingId').value });
            } else {
                this.setState({ showDay: true, targetDay: e.target.attributes.getNamedItem('id').value });
            }
        }
    }

    // Close the day editing panel
    closeDay = () => {
        this.setState({ showDay: false });
    }

    // Save to db and close the day editing panel
    saveDay = () => {
        if (localStorage.getItem('TCgId') !== null) {
            const TCgId = localStorage.getItem('TCgId');
            const targetDateChanged = this.state.targetDay.replace(/\./g, "");
            const descriptionValue = document.getElementById("description").value;

            console.log(TCgId, targetDateChanged, descriptionValue)

            fetch('http://localhost:3322/training',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "userid": TCgId,
                        "trainingdate": targetDateChanged,
                        "description": descriptionValue,
                        "other": ""
                    }
                })
                .then(response => response.json())
                .then(response => {
                    this.setState({ showDay: false });
                    this.refresh();
                    this.forceUpdate();
                });
        }
    }

    // Delete to db and close the day editing panel
    deleteDay = () => {
        // TODO: Add alert to confirm deleting...
        const TCgId = localStorage.getItem('TCgId');
        const targetDateChanged = this.state.targetDay.replace(/\./g, "");
        const targetDayTId = this.state.targetDayTId;

        fetch('http://localhost:3322/training',
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "userid": TCgId,
                    "trainingdate": targetDateChanged,
                    "idtodelete": targetDayTId
                }
            })
            .then(response => response.json())
            .then(response => {
                this.setState({ showDay: false });
                this.refresh();
                this.forceUpdate();
            });
    }

    addToDescription = (e) => {
        const target = e.target;
        document.getElementById("description").value += target.innerText;
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
                {TCgId !== null && !isFetching && <div>
                    <div>
                        <GoogleLogin />
                    </div>

                    {showDay &&
                        <div id="red-toast">
                            <div>
                                <button id="red-toast-close" onClick={this.closeDay}>x</button>
                                Day: {targetDay}
                                <br /><small>Quick add:<br />
                                    <span onClick={this.addToDescription}>RUN </span>
                                    <span onClick={this.addToDescription}>WALK </span>
                                    <span onClick={this.addToDescription}>BIKE </span>
                                    <span onClick={this.addToDescription}>GYM </span>
                                    <span onClick={this.addToDescription}>SPINNING </span>
                                </small>
                                <br />Comment:<br /><textarea id="description"></textarea>
                                <br /><button onClick={this.saveDay}>Save</button> <button onClick={this.deleteDay}>Delete</button>
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