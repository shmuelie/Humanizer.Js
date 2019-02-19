interface Date
{
    at(hour: number, min: number, second: number, millisecond: number): Date;
    atMidnight(): Date;
    atNoon(): Date;
    in(year: number): Date;
}

module Humanizer
{
    "use strict";

    Date.prototype.at = function (hour: number, min: number = 0, second: number = 0, millisecond: number = 0): Date
    {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate(), hour, min, second, millisecond);
    };

    /**
     * Returns a new instance of DateTime based on the provided date where the time is set to midnight
     */
    Date.prototype.atMidnight = function ()
    {
        /// <summary>
        ///     Returns a new instance of DateTime based on the provided date where the time is set to midnight
        /// </summary>

        return this.at(0);
    };

    /**
     * Returns a new instance of DateTime based on the provided date where the time is set to noon
     */
    Date.prototype.atNoon = function ()
    {
        /// <summary>
        ///     Returns a new instance of DateTime based on the provided date where the time is set to noon
        /// </summary>

        return this.at(12);
    };

    /**
     * Returns a new instance of DateTime based on the provided date where the year is set to the provided year
     */
    Date.prototype.in = function (year: number)
    {
        /// <summary>
        ///     Returns a new instance of DateTime based on the provided date where the year is set to the provided year
        /// </summary>

        return new Date(year, this.getMonth(), this.getDate(), this.getHours(), this.getSeconds(), this.getMilliseconds());
    };
} 