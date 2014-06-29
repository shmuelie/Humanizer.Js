interface Number
{
    days: () => number;
    weeks: () => number;
    hours: () => number;
    minutes: () => number;
    seconds: () => number;
    milliseconds: () => number;
}

module Humanizer
{
    var MILLIS_PER_SECOND: number = 1000;
    var MILLIS_PER_MINUTE: number = MILLIS_PER_SECOND * 60;
    var MILLIS_PER_HOUR: number = MILLIS_PER_MINUTE * 60;
    var MILLIS_PER_DAY: number = MILLIS_PER_HOUR * 24;

    Number.prototype.days = function (): number
    {
        return this * MILLIS_PER_DAY;
    };

    Number.prototype.weeks = function (): number
    {
        return (this * 7).days();
    };

    Number.prototype.hours = function (): number
    {
        return this * MILLIS_PER_HOUR;
    };

    Number.prototype.minutes = function (): number
    {
        return this * MILLIS_PER_MINUTE;
    };

    Number.prototype.seconds = function (): number
    {
        return this * MILLIS_PER_SECOND;
    };

    Number.prototype.milliseconds = function (): number
    {
        return this;
    };
} 