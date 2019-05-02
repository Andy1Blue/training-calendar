import React, { Component } from 'react';
import './style.css';
import Loader from '../Loader';

class ListOfMonths extends Component {
    state = {
        isFetching: true,
        isWorkoutDate: []
    }

    daysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    addRect = (selector, day, month, year) => {
        var elem = document.createElement("rect");

        for (var i = 0; i < this.state.isWorkoutDate.length; i++) {
            if (day + "" + month + "" + year === this.state.isWorkoutDate[i]) {
                elem.setAttribute("style", "background-color: green;");
                elem.setAttribute("comment", day + "." + month + "." + year + " - workout!");
            } else {
                elem.setAttribute("id", day + "." + month + "." + year);
                elem.setAttribute("comment", day + "." + month + "." + year + " - no workout");
            }
        }

        const m = document.getElementById("root").querySelector(".App .App-matches .container ." + selector);
        m.appendChild(elem);
    };

    componentWillMount() {
        fetch('http://localhost:3322/training',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "userId": 1
                }
            })
            .then(response => response.json())
            .then(response => {
                let isWorkoutDate = [];
                for (let i = 0; i < response.length; i++) {
                    isWorkoutDate.push(response[i].training_date);
                }
                console.log(isWorkoutDate);
                this.setState({ isWorkoutDate, isFetching: false });
            });
    }

    componentDidUpdate() {
        let actualYear = 2019;
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

    render() {
        const { isFetching } = this.state;
        return (
            <div className="App-matches">

                {isFetching && <div><Loader /></div>}

                {!isFetching &&
                    <div className="container">
                        <div className="row">
                            <div className="traning-table-content">
                                <div className="col">
                                    <div className="m1"></div><br />
                                    <div className="m2"></div><br />
                                    <div className="m3"></div><br />
                                    <div className="m4"></div><br />
                                    <div className="m5"></div><br />
                                    <div className="m6"></div><br />
                                    <div className="m7"></div><br />
                                    <div className="m8"></div><br />
                                    <div className="m9"></div><br />
                                    <div className="m10"></div><br />
                                    <div className="m11"></div><br />
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