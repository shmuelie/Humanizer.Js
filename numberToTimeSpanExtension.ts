module Humanizer
{
    var MILLIS_PER_SECOND: number = 1000;
    var MILLIS_PER_MINUTE: number = MILLIS_PER_SECOND * 60;
    var MILLIS_PER_HOUR: number = MILLIS_PER_MINUTE * 60;
    var MILLIS_PER_DAY: number = MILLIS_PER_HOUR * 24;

    Number.prototype.days = function ()
    {
        return this * MILLIS_PER_DAY;
    };

    Number.prototype.weeks = function ()
    {
        return (this * 7).days();
    };

    Number.prototype.hours = function ()
    {
        return this * MILLIS_PER_HOUR;
    };

    Number.prototype.minutes = function ()
    {
        return this * MILLIS_PER_MINUTE;
    };

    Number.prototype.seconds = function ()
    {
        return this * MILLIS_PER_SECOND;
    };

    Number.prototype.milliseconds = function ()
    {
        return this;
    };
} 