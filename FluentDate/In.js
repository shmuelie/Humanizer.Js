var Humanizer;
(function (Humanizer) {
    "use strict";
    var someTime = {};
    var MILLIS_PER_SECOND = 1000;
    var MILLIS_PER_MINUTE = MILLIS_PER_SECOND * 60;
    var MILLIS_PER_HOUR = MILLIS_PER_MINUTE * 60;
    var MILLIS_PER_DAY = MILLIS_PER_HOUR * 24;
    var MILLIS_PER_WEEK = MILLIS_PER_DAY * 7;
    for (var i = 1; i <= 10; i++) {
        var plural = i > 1 ? "s" : "";
        var second = "second" + plural;
        var minute = "minute" + plural;
        var hour = "hour" + plural;
        var day = "day" + plural;
        var week = "week" + plural;
        var month = "month" + plural;
        var year = "year" + plural;
        someTime[i] = {};
        someTime[i][second] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_SECOND);
            };
            return fn;
        }(i));
        someTime[i][second + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_SECOND);
            };
            return fn;
        }(i));
        someTime[i][minute] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_MINUTE);
            };
            return fn;
        }(i));
        someTime[i][minute + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_MINUTE);
            };
            return fn;
        }(i));
        someTime[i][hour] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_HOUR);
            };
            return fn;
        }(i));
        someTime[i][hour + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_HOUR);
            };
            return fn;
        }(i));
        someTime[i][day] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_DAY);
            };
            return fn;
        }(i));
        someTime[i][day + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_DAY);
            };
            return fn;
        }(i));
        someTime[i][week] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_WEEK);
            };
            return fn;
        }(i));
        someTime[i][week + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_WEEK);
            };
            return fn;
        }(i));
        someTime[i][month] = (function (j) {
            var fn = function () {
                var now = new Date();
                now.setMonth(now.getMonth() + j);
                return now;
            };
            return fn;
        }(i));
        someTime[i][month + "From"] = (function (j) {
            var fn = function (date) {
                var newDate = new Date(date.getTime());
                newDate.setMonth(date.getMonth() + j);
                return newDate;
            };
            return fn;
        }(i));
        someTime[i][year] = (function (j) {
            var fn = function () {
                var now = new Date();
                now.setFullYear(now.getFullYear() + j);
                return now;
            };
            return fn;
        }(i));
        someTime[i][year + "From"] = (function (j) {
            var fn = function (date) {
                var newDate = new Date(date.getTime());
                newDate.setFullYear(newDate.getFullYear() + j);
                return newDate;
            };
            return fn;
        }(i));
    }
    var In = (function () {
        function In() {
        }
        In.theYear = function (year) {
            return new Date(year, 0, 1, 0, 0, 0, 0);
        };
        /**
         * Returns the 1st of January of the current year
         */
        In.january = function () {
            /// <summary>
            ///     Returns the 1st of January of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 0, 1, 0, 0, 0, 0);
        };
        /**
         * Returns the 1st of February of the current year
         */
        In.february = function () {
            /// <summary>
            ///     Returns the 1st of February of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 1, 1, 0, 0, 0, 0);
        };
        /**
         * Returns the 1st of March of the current year
         */
        In.march = function () {
            /// <summary>
            ///     Returns the 1st of March of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 2, 1, 0, 0, 0, 0);
        };
        /**
         * Returns the 1st of April of the current year
         */
        In.april = function () {
            /// <summary>
            ///     Returns the 1st of April of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 3, 1, 0, 0, 0, 0);
        };
        /**
         * Returns the 1st of May of the current year
         */
        In.may = function () {
            /// <summary>
            ///     Returns the 1st of May of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 4, 1, 0, 0, 0, 0);
        };
        /**
         * Returns the 1st of June of the current year
         */
        In.june = function () {
            /// <summary>
            ///     Returns the 1st of June of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 5, 1, 0, 0, 0, 0);
        };
        /**
         * Returns the 1st of July of the current year
         */
        In.july = function () {
            /// <summary>
            ///     Returns the 1st of July of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 6, 1, 0, 0, 0, 0);
        };
        /**
         * Returns the 1st of August of the current year
         */
        In.august = function () {
            /// <summary>
            ///     Returns the 1st of August of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 7, 1, 0, 0, 0, 0);
        };
        /**
         * Returns the 1st of September of the current year
         */
        In.september = function () {
            /// <summary>
            ///     Returns the 1st of September of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 8, 1, 0, 0, 0, 0);
        };
        /**
         * Returns the 1st of October of the current year
         */
        In.october = function () {
            /// <summary>
            ///     Returns the 1st of October of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 9, 1, 0, 0, 0, 0);
        };
        /**
         * Returns the 1st of November of the current year
         */
        In.november = function () {
            /// <summary>
            ///     Returns the 1st of November of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 10, 1, 0, 0, 0, 0);
        };
        /**
         * Returns the 1st of December of the current year
         */
        In.december = function () {
            /// <summary>
            ///     Returns the 1st of December of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 11, 1, 0, 0, 0, 0);
        };
        In.one = someTime[1];
        In.two = someTime[2];
        In.three = someTime[3];
        In.four = someTime[4];
        In.five = someTime[5];
        In.six = someTime[6];
        In.seven = someTime[7];
        In.eight = someTime[8];
        In.nine = someTime[9];
        In.ten = someTime[10];
        return In;
    })();
    Humanizer.In = In;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=In.js.map