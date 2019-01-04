window.onload = function () {
    var actualYear = 2019;

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function addRect(selector, day, month, year) {
        var elem = document.createElement("rect");
        elem.setAttribute("id", day + "." + month + "." + year);
        elem.setAttribute("comment", day + "." + month + "." + year + " - no workout");

        var isWorkoutDate = [23072019, 5022019, 6022019, 9022019, 2052019, 2012019, 1102019, 1012019, 2012019, 3012019, 20062019];
        for (var i = 0; i < isWorkoutDate.length; i++) {
            if (day + month + year == isWorkoutDate[i]) {
                elem.setAttribute("style", "background-color: green;");
                elem.setAttribute("comment", day + "." + month + "." + year + " - workout!");
            }
        }

        const m = document.querySelector(selector);
        m.appendChild(elem);

    };

    // // Names of all months
    // for (let i = 1; i <= 31; i++) {
    //     const el = document.createElement("div");
    //     el.innerText = i;
    //     el.setAttribute("title", "To jest tekst w dymku");
    //     const div = document.querySelector(".m");
    //     div.appendChild(el);
    // }

    for (let i = 1; i <= daysInMonth(1, actualYear); i++) {
        addRect(".m1", i, "01", actualYear);
    }

    for (let i = 1; i <= daysInMonth(2, actualYear); i++) {
        addRect(".m2", i, "02", actualYear);
    }

    for (let i = 1; i <= daysInMonth(3, actualYear); i++) {
        addRect(".m3", i, "03", actualYear);
    }

    for (let i = 1; i <= daysInMonth(4, actualYear); i++) {
        addRect(".m4", i, "04", actualYear);
    }

    for (let i = 1; i <= daysInMonth(5, actualYear); i++) {
        addRect(".m5", i, "05", actualYear);
    }

    for (let i = 1; i <= daysInMonth(6, actualYear); i++) {
        addRect(".m6", i, "06", actualYear);
    }
    for (let i = 1; i <= daysInMonth(7, actualYear); i++) {
        addRect(".m7", i, "07", actualYear);
    }

    for (let i = 1; i <= daysInMonth(8, actualYear); i++) {
        addRect(".m8", i, "08", actualYear);
    }

    for (let i = 1; i <= daysInMonth(9, actualYear); i++) {
        addRect(".m9", i, "09", actualYear);
    }

    for (let i = 1; i <= daysInMonth(10, actualYear); i++) {
        addRect(".m10", i, "10", actualYear);
    }

    for (let i = 1; i <= daysInMonth(11, actualYear); i++) {
        addRect(".m11", i, "11", actualYear);
    }

    for (let i = 1; i <= daysInMonth(12, actualYear); i++) {
        addRect(".m12", i, "12", actualYear);
    }
};