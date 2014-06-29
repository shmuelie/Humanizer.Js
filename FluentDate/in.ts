module Humanizer
{
    var someTime = {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {}
    };

    var MILLIS_PER_SECOND: number = 1000;
    var MILLIS_PER_MINUTE: number = MILLIS_PER_SECOND * 60;
    var MILLIS_PER_HOUR: number = MILLIS_PER_MINUTE * 60;
    var MILLIS_PER_DAY: number = MILLIS_PER_HOUR * 24;
    var MILLIS_PER_WEEK: number = MILLIS_PER_DAY * 7;

    for (var i: number = 1; i <= 10; i++)
    {
        var plural: string = i > 1 ? "s" : "";
        var second: string = "second" + plural;
        var minute: string = "minute" + plural;
        var hour: string = "hour" + plural;
        var day: string = "day" + plural;
        var week: string = "week" + plural;
        var month: string = "month" + plural;
        var year: string = "year" + plural;

        someTime[i][second] = (function (j)
        {
            var fn: () => Date = function ()
            {
                return new Date((new Date()).getTime() + j * MILLIS_PER_SECOND);
            };
            return fn;
        } (i));
        someTime[i][second + "From"] = (function (j)
        {
            var fn: (date: Date) => Date = function (date: Date)
            {
                return new Date(date.getTime() + j * MILLIS_PER_SECOND);
            };
            return fn;
        } (i));
        someTime[i][minute] = (function (j)
        {
            var fn: () => Date = function ()
            {
                return new Date((new Date()).getTime() + j * MILLIS_PER_MINUTE);
            };
            return fn;
        } (i));
        someTime[i][minute + "From"] = (function (j)
        {
            var fn: (date: Date) => Date = function (date: Date)
            {
                return new Date(date.getTime() + j * MILLIS_PER_MINUTE);
            };
            return fn;
        } (i));
        someTime[i][hour] = (function (j)
        {
            var fn: () => Date = function ()
            {
                return new Date((new Date()).getTime() + j * MILLIS_PER_HOUR);
            };
            return fn;
        } (i));
        someTime[i][hour + "From"] = (function (j)
        {
            var fn: (date: Date) => Date = function (date: Date)
            {
                return new Date(date.getTime() + j * MILLIS_PER_HOUR);
            };
            return fn;
        } (i));
        someTime[i][day] = (function (j)
        {
            var fn: () => Date = function ()
            {
                return new Date((new Date()).getTime() + j * MILLIS_PER_DAY);
            };
            return fn;
        } (i));
        someTime[i][day + "From"] = (function (j)
        {
            var fn: (date: Date) => Date = function (date: Date)
            {
                return new Date(date.getTime() + j * MILLIS_PER_DAY);
            };
            return fn;
        } (i));
        someTime[i][week] = (function (j)
        {
            var fn: () => Date = function ()
            {
                return new Date((new Date()).getTime() + j * MILLIS_PER_WEEK);
            };
            return fn;
        } (i));
        someTime[i][week + "From"] = (function (j)
        {
            var fn: (date: Date) => Date = function (date: Date)
            {
                return new Date(date.getTime() + j * MILLIS_PER_WEEK);
            };
            return fn;
        } (i));
        someTime[i][month] = (function (j)
        {
            var fn: () => Date = function ()
            {
                var now: Date = new Date();
                now.setMonth(now.getMonth() + j);
                return now;
            };
            return fn;
        } (i));
        someTime[i][month + "From"] = (function (j)
        {
            var fn: (date: Date) => Date = function (date: Date)
            {
                var newDate = new Date(date.getTime());
                newDate.setMonth(date.getMonth() + j);
                return newDate;
            };
        } (i));
        someTime[i][year] = (function (j)
        {
            var fn: () => Date = function ()
            {
                var now = new Date();
                now.setFullYear(now.getFullYear() + j);
                return now;
            };
            return fn;
        } (i));
        someTime[i][year + "From"] = (function (j)
        {
            var fn: (date: Date) => Date = function (date: Date)
            {
                var newDate = new Date(date.getTime());
                newDate.setFullYear(newDate.getFullYear() + j);
                return newDate;
            };
            return fn;
        } (i));
    }

    export class In
    {
        static one = someTime[1];
        static two = someTime[2];
        static three = someTime[3];
        static four = someTime[4];
        static five = someTime[5];
        static six = someTime[6];
        static seven = someTime[7];
        static eight = someTime[8];
        static nine = someTime[9];
        static ten = someTime[10]

        static theYear(year: number): Date
        {
            return new Date(year, 0, 1, 0, 0, 0, 0);
        }

        /**
         * Returns the 1st of January of the current year
         */
        static january(): Date
        {
            /// <summary>
            ///     Returns the 1st of January of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 0, 1, 0, 0, 0, 0);
        }

        /**
         * Returns the 1st of February of the current year
         */
        static february(): Date
        {
            /// <summary>
            ///     Returns the 1st of February of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 1, 1, 0, 0, 0, 0);
        }

        /**
         * Returns the 1st of March of the current year
         */
        static march(): Date
        {
            /// <summary>
            ///     Returns the 1st of March of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 2, 1, 0, 0, 0, 0);
        }

        /**
         * Returns the 1st of April of the current year
         */
        static april(): Date
        {
            /// <summary>
            ///     Returns the 1st of April of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 3, 1, 0, 0, 0, 0);
        }

        /**
         * Returns the 1st of May of the current year
         */
        static may(): Date
        {
            /// <summary>
            ///     Returns the 1st of May of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 4, 1, 0, 0, 0, 0);
        }

        /**
         * Returns the 1st of June of the current year
         */
        static june(): Date
        {
            /// <summary>
            ///     Returns the 1st of June of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 5, 1, 0, 0, 0, 0);
        }

        /**
         * Returns the 1st of July of the current year
         */
        static july(): Date
        {
            /// <summary>
            ///     Returns the 1st of July of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 6, 1, 0, 0, 0, 0);
        }

        /**
         * Returns the 1st of August of the current year
         */
        static august(): Date
        {
            /// <summary>
            ///     Returns the 1st of August of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 7, 1, 0, 0, 0, 0);
        }

        /**
         * Returns the 1st of September of the current year
         */
        static september(): Date
        {
            /// <summary>
            ///     Returns the 1st of September of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 8, 1, 0, 0, 0, 0);
        }

        /**
         * Returns the 1st of October of the current year
         */
        static october(): Date
        {
            /// <summary>
            ///     Returns the 1st of October of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 9, 1, 0, 0, 0, 0);
        }

        /**
         * Returns the 1st of November of the current year
         */
        static november(): Date
        {
            /// <summary>
            ///     Returns the 1st of November of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 10, 1, 0, 0, 0, 0);
        }

        /**
         * Returns the 1st of December of the current year
         */
        static december(): Date
        {
            /// <summary>
            ///     Returns the 1st of December of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 11, 1, 0, 0, 0, 0);
        }
    }
} 