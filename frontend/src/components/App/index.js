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
import Loader from '../Loader';

class App extends Component {
    state = {
        isFetching: false,
        isLogin: false, // Local Sotorage TCgId exist
        TCgId: null,
        showDay: false,
        targetDay: null,
        refresh: false,
        targetDayTId: null,
        dayObject: {
            description: null
        },
        showDayLoader: true
    }

    // Show the day editing panel
    showDay = (e) => {
        if (e.target.attributes.getNamedItem('id') !== null) {
            if (e.target.attributes.getNamedItem('trainingId')) {
                this.isDay(e.target.attributes.getNamedItem('id').value, e.target.attributes.getNamedItem('trainingId').value);
            } else {
                this.setState({ showDayLoader: false, dayObject: { description: null }, showDay: true, targetDay: e.target.attributes.getNamedItem('id').value });
            }
        }
    }

    // Close the day editing panel
    closeDay = () => {
        this.setState({ showDay: false });
    }

    isDay = (day, trainingId) => {
        this.setState({ showDayLoader: true, showDay: true });
        if (localStorage.getItem('TCgId') !== null) {
            const TCgId = localStorage.getItem('TCgId');
            const targetDateChanged = day.replace(/\./g, "");

            fetch('http://localhost:3322/training',
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "userid": TCgId,
                        "trainingdate": targetDateChanged,
                    }
                })
                .then(response => response.json())
                .then(response => {
                    this.setState({ dayObject: { description: response.description }, showDay: true, targetDay: day, targetDayTId: trainingId, showDayLoader: false });
                }).catch(e => {
                    this.setState({ dayObject: { description: null }, showDay: false, targetDay: null, targetDayTId: null });
                });
        }
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

    updateDay = () => {
        if (localStorage.getItem('TCgId') !== null) {
            const TCgId = localStorage.getItem('TCgId');
            const targetDateChanged = this.state.targetDay.replace(/\./g, "");
            const descriptionValue = document.getElementById("description").value;

            console.log(TCgId, targetDateChanged, descriptionValue)

            fetch('http://localhost:3322/training',
                {
                    method: "PUT",
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
        const { isFetching, TCgId, showDay, targetDay, refresh, dayObject, showDayLoader } = this.state;
        return (
            <div className="App">
                {isFetching && <div><Loader /></div>}
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
                                {!showDayLoader &&
                                    <div>
                                        Day: {targetDay}
                                        <br /><small>Quick add:<br />
                                            <span onClick={this.addToDescription}>RUN </span>
                                            <span onClick={this.addToDescription}>WALK </span>
                                            <span onClick={this.addToDescription}>BIKE </span>
                                            <span onClick={this.addToDescription}>GYM </span>
                                            <span onClick={this.addToDescription}>SPINNING </span>
                                        </small>

                                        <br />Comment:<br />

                                        {dayObject.description && <textarea id="description" onChange={e => this.setState({ description: e.target.value })}>{dayObject.description}</textarea>}
                                        {!dayObject.description && <textarea id="description"></textarea>}

                                        <br />
                                        {!dayObject.description && <button onClick={this.saveDay}>Save</button>}
                                        {dayObject.description && <button onClick={this.updateDay}>Update</button>}
                                        {dayObject.description && <button onClick={this.deleteDay}>Delete</button>}
                                    </div>
                                }
                                {showDayLoader &&
                                    <div><Loader /></div>
                                }
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