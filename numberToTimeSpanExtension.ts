interface Number
{
    days(): number;
    weeks(): number;
    hours(): number;
    minutes(): number;
    seconds(): number;
    milliseconds(): number;
    time(percision?: number, countEmptyUnits?: boolean): string;
}

module Humanizer
{
    "use strict";

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

    Number.prototype.time = function (percision: number = 1, countEmptyUnits: boolean = false, culture: string = Resources.getCurrentCulture()): string
    {
        var timeParts: string[] = parts(this, culture);
        var i = 0;
        if (!countEmptyUnits)
        {
            while (i < timeParts.length)
            {
                if (timeParts[i] === null)
                {
                    timeParts.splice(i, 1);
                }
                else
                {
                    i++;
                }
            }
        }
        if (percision < timeParts.length)
        {
            timeParts.splice(percision, timeParts.length - percision);
        }
        if (countEmptyUnits)
        {
            i = 0;
            while (i < timeParts.length)
            {
                if (timeParts[i] === null)
                {
                    timeParts.splice(i, 1);
                }
                else
                {
                    i++;
                }
            }
        }
        return timeParts.join(", ");
    };

    function parts(timespan: number, culture: string): string[]
    {
        var days: number = timespan / MILLIS_PER_DAY;
        var weeks: number = Math.floor(days / 7);
        var daysInWeek: number = days % 7;
        timespan = timespan - ((weeks * 7 + daysInWeek) * MILLIS_PER_DAY);
        var hours: number = Math.floor(timespan / MILLIS_PER_HOUR);
        timespan = timespan - (hours * MILLIS_PER_HOUR);
        var minutes: number = Math.floor(timespan / MILLIS_PER_MINUTE);
        timespan = timespan - (minutes * MILLIS_PER_MINUTE);
        var seconds: number = Math.floor(timespan / MILLIS_PER_SECOND);
        var milliseconds = timespan - (seconds * MILLIS_PER_SECOND);

        var outputWeeks: boolean = weeks > 0;
        var outputDays: boolean = outputWeeks || daysInWeek > 0;
        var outputHours: boolean = outputDays || hours > 0;
        var outputMinutes: boolean = outputHours || minutes > 0;
        var outputSeconds: boolean = outputMinutes || seconds > 0;
        var outputMilliseconds: boolean = outputSeconds || milliseconds > 0;

        var result: string[];
        var formatter: Localisation.Formatter.IFormatter = Configuration.Configurator.getFormatter(culture);
        if (outputWeeks)
        {
            result.push(part(formatter, Localisation.TimeUnit.Week, weeks));
        }
        if (outputDays)
        {
            result.push(part(formatter, Localisation.TimeUnit.Day, days));
        }
        if (outputHours)
        {
            result.push(part(formatter, Localisation.TimeUnit.Hour, hours));
        }
        if (outputMinutes)
        {
            result.push(part(formatter, Localisation.TimeUnit.Minute, minutes));
        }
        if (outputSeconds)
        {
            result.push(part(formatter, Localisation.TimeUnit.Second, seconds));
        }
        if (outputMilliseconds)
        {
            result.push(part(formatter, Localisation.TimeUnit.Millisecond, milliseconds));
        }
        else
        {
            result.push(formatter.TimeHumanizer_Zero());
        }
        return result;
    }

    function part(formatter: Localisation.Formatter.IFormatter, timeUnit: Localisation.TimeUnit, unit: number): string
    {
        return unit !== 0 ? formatter.TimeHumanize(timeUnit, unit) : null;
    }
} 