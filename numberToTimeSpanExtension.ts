interface Number
{
    days(): number;
    weeks(): number;
    hours(): number;
    minutes(): number;
    seconds(): number;
    milliseconds(): number;
    toDays(): number;
    toWeeks(): number;
    toHours(): number;
    toMinutes(): number;
    toSeconds(): number;
    toMilliseconds(): number;
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

    Number.prototype.toDays = function (): number
    {
        return this / MILLIS_PER_DAY;
    };

    Number.prototype.toWeeks = function (): number
    {
        return (this / 7).toDays();
    };

    Number.prototype.toDays = function (): number
    {
        return this / MILLIS_PER_DAY;
    };

    Number.prototype.toHours = function (): number
    {
        return this / MILLIS_PER_HOUR;
    };

    Number.prototype.toMinutes = function (): number
    {
        return this / MILLIS_PER_MINUTE;
    };

    Number.prototype.toSeconds = function (): number
    {
        return this / MILLIS_PER_SECOND;
    };

    Number.prototype.toMilliseconds = function (): number
    {
        return this;
    }

    Number.prototype.time = function (percision: number = 1, countEmptyUnits: boolean = false, culture: string = Resources.getCurrentCulture(), maxUnit: Localisation.TimeUnit = Localisation.TimeUnit.Week): string
    {
        var timeParts: string[] = parts(this, culture, maxUnit);
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

    function parts(timespan: number, culture: string, maxUnit: Localisation.TimeUnit): string[]
    {
        var days: number = timespan / MILLIS_PER_DAY;
        var weeks: number = Math.floor(days / 7);
        var daysInWeek: number = maxUnit > Localisation.TimeUnit.Day ? days % 7 : Math.floor(days);
        if (maxUnit > Localisation.TimeUnit.Hour)
        {
            timespan = timespan - ((weeks * 7 + daysInWeek) * MILLIS_PER_DAY);
        }
        var hours: number = Math.floor(timespan / MILLIS_PER_HOUR);
        if (maxUnit > Localisation.TimeUnit.Minute)
        {
            timespan = timespan - (hours * MILLIS_PER_HOUR);
        }
        var minutes: number = Math.floor(timespan / MILLIS_PER_MINUTE);
        if (maxUnit > Localisation.TimeUnit.Second)
        {
            timespan = timespan - (minutes * MILLIS_PER_MINUTE);
        }
        var seconds: number = Math.floor(timespan / MILLIS_PER_SECOND);
        var milliseconds: number = maxUnit === Localisation.TimeUnit.Millisecond ? timespan : timespan - (seconds * MILLIS_PER_SECOND);

        var outputWeeks: boolean = weeks > 0 && maxUnit === Localisation.TimeUnit.Week;
        var outputDays: boolean = (outputWeeks || daysInWeek > 0) && maxUnit >= Localisation.TimeUnit.Day;
        var outputHours: boolean = (outputDays || hours > 0) && maxUnit >= Localisation.TimeUnit.Hour;
        var outputMinutes: boolean = (outputHours || minutes > 0) && maxUnit >= Localisation.TimeUnit.Minute;
        var outputSeconds: boolean = (outputMinutes || seconds > 0) && maxUnit >= Localisation.TimeUnit.Second;
        var outputMilliseconds: boolean = (outputSeconds || milliseconds > 0) && maxUnit >= Localisation.TimeUnit.Millisecond;

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