var Humanizer;
(function (Humanizer) {
    "use strict";
    var MILLIS_PER_SECOND = 1000;
    var MILLIS_PER_MINUTE = MILLIS_PER_SECOND * 60;
    var MILLIS_PER_HOUR = MILLIS_PER_MINUTE * 60;
    var MILLIS_PER_DAY = MILLIS_PER_HOUR * 24;
    Number.prototype.days = function () {
        return this * MILLIS_PER_DAY;
    };
    Number.prototype.weeks = function () {
        return (this * 7).days();
    };
    Number.prototype.hours = function () {
        return this * MILLIS_PER_HOUR;
    };
    Number.prototype.minutes = function () {
        return this * MILLIS_PER_MINUTE;
    };
    Number.prototype.seconds = function () {
        return this * MILLIS_PER_SECOND;
    };
    Number.prototype.milliseconds = function () {
        return this;
    };
    Number.prototype.time = function (percision, countEmptyUnits, culture) {
        if (percision === void 0) { percision = 1; }
        if (countEmptyUnits === void 0) { countEmptyUnits = false; }
        if (culture === void 0) { culture = Humanizer.Resources.getCurrentCulture(); }
        var timeParts = parts(this, culture);
        var i = 0;
        if (!countEmptyUnits) {
            while (i < timeParts.length) {
                if (timeParts[i] === null) {
                    timeParts.splice(i, 1);
                }
                else {
                    i++;
                }
            }
        }
        if (percision < timeParts.length) {
            timeParts.splice(percision, timeParts.length - percision);
        }
        if (countEmptyUnits) {
            i = 0;
            while (i < timeParts.length) {
                if (timeParts[i] === null) {
                    timeParts.splice(i, 1);
                }
                else {
                    i++;
                }
            }
        }
        return timeParts.join(", ");
    };
    function parts(timespan, culture) {
        var days = timespan / MILLIS_PER_DAY;
        var weeks = Math.floor(days / 7);
        var daysInWeek = days % 7;
        timespan = timespan - ((weeks * 7 + daysInWeek) * MILLIS_PER_DAY);
        var hours = Math.floor(timespan / MILLIS_PER_HOUR);
        timespan = timespan - (hours * MILLIS_PER_HOUR);
        var minutes = Math.floor(timespan / MILLIS_PER_MINUTE);
        timespan = timespan - (minutes * MILLIS_PER_MINUTE);
        var seconds = Math.floor(timespan / MILLIS_PER_SECOND);
        var milliseconds = timespan - (seconds * MILLIS_PER_SECOND);
        var outputWeeks = weeks > 0;
        var outputDays = outputWeeks || daysInWeek > 0;
        var outputHours = outputDays || hours > 0;
        var outputMinutes = outputHours || minutes > 0;
        var outputSeconds = outputMinutes || seconds > 0;
        var outputMilliseconds = outputSeconds || milliseconds > 0;
        var result;
        var formatter = Humanizer.Configuration.Configurator.getFormatter(culture);
        if (outputWeeks) {
            result.push(part(formatter, 5 /* Week */, weeks));
        }
        if (outputDays) {
            result.push(part(formatter, 4 /* Day */, days));
        }
        if (outputHours) {
            result.push(part(formatter, 3 /* Hour */, hours));
        }
        if (outputMinutes) {
            result.push(part(formatter, 2 /* Minute */, minutes));
        }
        if (outputSeconds) {
            result.push(part(formatter, 1 /* Second */, seconds));
        }
        if (outputMilliseconds) {
            result.push(part(formatter, 0 /* Millisecond */, milliseconds));
        }
        else {
            result.push(formatter.TimeHumanizer_Zero());
        }
        return result;
    }
    function part(formatter, timeUnit, unit) {
        return unit !== 0 ? formatter.TimeHumanize(timeUnit, unit) : null;
    }
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=numberToTimeSpanExtension.js.map