/*
 *
 * Component for creating list of months
 *
 */

// Imports
import React, { Component } from 'react';
import './style.css';
import Loader from '../Loader';

class ListOfMonths extends Component {
    state = {
        isFetching: true,
        isWorkoutDate: [],
        TCgId: null,
        description: [],
        idList: []
    }

    // Calculate days in a month
    daysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    // Adding day rectangle
    addRect = (selector, day, month, year) => {
        const isWorkoutDate = this.state.isWorkoutDate;
        const description = this.state.description;
        const idList = this.state.idList;

        if (isWorkoutDate.length > 0) {
            var elem = document.createElement("rect");
            // Iterating fetched data from the database
            for (let i = 0; i < isWorkoutDate.length; i++) {
                console.log("01012019" === isWorkoutDate[i]);
                if (day + "" + month + "" + year === isWorkoutDate[i]) {
                    elem.setAttribute("id", day + "." + month + "." + year);
                    elem.setAttribute("style", "background-color: green;");
                    elem.setAttribute("comment", day + "." + month + "." + year + "[" + description[i] + "]");
                    elem.setAttribute("trainingId", idList[i])
                    break;
                } else {
                    elem.setAttribute("id", day + "." + month + "." + year);
                    elem.setAttribute("comment", day + "." + month + "." + year + ' [No training!]');
                }
            }

            // Adding an element for the selected selector
            const m = document.getElementById("root").querySelector(".App .App-matches .container ." + selector);
            m.appendChild(elem);
        }
    };

    generateReacts = () => {
        // TODO: Add the possibility of selecting the year by the user
        let actualYear = 2019;
        // If isWorkoutDate have more than 0 elements, create days rectangles
        if (this.state.isWorkoutDate.length > 0) {
            for (let i = 1; i <= this.daysInMonth(1, actualYear); i++) {
                this.addRect("m1", String("00" + i).slice(-2), "01", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(2, actualYear); i++) {
                this.addRect("m2", String("00" + i).slice(-2), "02", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(3, actualYear); i++) {
                this.addRect("m3", String("00" + i).slice(-2), "03", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(4, actualYear); i++) {
                this.addRect("m4", String("00" + i).slice(-2), "04", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(5, actualYear); i++) {
                this.addRect("m5", String("00" + i).slice(-2), "05", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(6, actualYear); i++) {
                this.addRect("m6", String("00" + i).slice(-2), "06", actualYear);
            }
            for (let i = 1; i <= this.daysInMonth(7, actualYear); i++) {
                this.addRect("m7", String("00" + i).slice(-2), "07", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(8, actualYear); i++) {
                this.addRect("m8", String("00" + i).slice(-2), "08", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(9, actualYear); i++) {
                this.addRect("m9", String("00" + i).slice(-2), "09", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(10, actualYear); i++) {
                this.addRect("m10", String("00" + i).slice(-2), "10", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(11, actualYear); i++) {
                this.addRect("m11", String("00" + i).slice(-2), "11", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(12, actualYear); i++) {
                this.addRect("m12", String("00" + i).slice(-2), "12", actualYear);
            }
        }
    }

    componentWillMount() {
        // If local storage is not null, fetch data from DB by userid
        if (localStorage.getItem('TCgId') !== null) {
            const TCgId = this.props.TCgId;

            fetch('http://localhost:3322/training',
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "userid": TCgId
                    }
                })
                .then(response => response.json())
                .then(response => {
                    let isWorkoutDate = [];
                    let description = [];
                    let idList = [];
                    for (let i = 0; i < response.length; i++) {
                        isWorkoutDate.push(response[i]['training_date']);
                        description.push(response[i]['description']);
                        idList.push(response[i]['id']);
                    }
                    console.log(isWorkoutDate, description);
                    this.setState({ isWorkoutDate, isFetching: false, description, idList });

                    // Generate rects
                    this.generateReacts();
                });
        } else {
            // If is null return empty data
            this.setState({ isWorkoutDate: [], isFetching: false })
        }
    }

    render() {
        const { isFetching, isWorkoutDate } = this.state;
        return (
            <div className="App-matches">
                {isFetching && <div><Loader /></div>}

                {!isFetching && isWorkoutDate.length > 0 &&
                    <div className="container" id="calendar">
                        <div className="row">
                            <div className="traning-table-content">
                                <div className="col">
                                    <div className="m1"></div>
                                    <div className="m2"></div>
                                    <div className="m3"></div>
                                    <div className="m4"></div>
                                    <div className="m5"></div>
                                    <div className="m6"></div>
                                    <div className="m7"></div>
                                    <div className="m8"></div>
                                    <div className="m9"></div>
                                    <div className="m10"></div>
                                    <div className="m11"></div>
                                    <div className="m12"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default ListOfMonths;