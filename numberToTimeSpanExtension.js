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

    Number.prototype.toDays = function () {
        return this / MILLIS_PER_DAY;
    };

    Number.prototype.toWeeks = function () {
        return (this / 7).toDays();
    };

    Number.prototype.toDays = function () {
        return this / MILLIS_PER_DAY;
    };

    Number.prototype.toHours = function () {
        return this / MILLIS_PER_HOUR;
    };

    Number.prototype.toMinutes = function () {
        return this / MILLIS_PER_MINUTE;
    };

    Number.prototype.toSeconds = function () {
        return this / MILLIS_PER_SECOND;
    };

    Number.prototype.toMilliseconds = function () {
        return this;
    };

    Number.prototype.time = function (percision, countEmptyUnits, culture, maxUnit) {
        if (typeof percision === "undefined") { percision = 1; }
        if (typeof countEmptyUnits === "undefined") { countEmptyUnits = false; }
        if (typeof culture === "undefined") { culture = Humanizer.Resources.getCurrentCulture(); }
        if (typeof maxUnit === "undefined") { maxUnit = 5 /* Week */; }
        var timeParts = parts(this, culture, maxUnit);
        var i = 0;
        if (!countEmptyUnits) {
            while (i < timeParts.length) {
                if (timeParts[i] === null) {
                    timeParts.splice(i, 1);
                } else {
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
                } else {
                    i++;
                }
            }
        }
        return timeParts.join(", ");
    };

    function parts(timespan, culture, maxUnit) {
        var days = timespan / MILLIS_PER_DAY;
        var weeks = Math.floor(days / 7);
        var daysInWeek = maxUnit > 4 /* Day */ ? days % 7 : Math.floor(days);
        if (maxUnit > 3 /* Hour */) {
            timespan = timespan - ((weeks * 7 + daysInWeek) * MILLIS_PER_DAY);
        }
        var hours = Math.floor(timespan / MILLIS_PER_HOUR);
        if (maxUnit > 2 /* Minute */) {
            timespan = timespan - (hours * MILLIS_PER_HOUR);
        }
        var minutes = Math.floor(timespan / MILLIS_PER_MINUTE);
        if (maxUnit > 1 /* Second */) {
            timespan = timespan - (minutes * MILLIS_PER_MINUTE);
        }
        var seconds = Math.floor(timespan / MILLIS_PER_SECOND);
        var milliseconds = maxUnit === 0 /* Millisecond */ ? timespan : timespan - (seconds * MILLIS_PER_SECOND);

        var outputWeeks = weeks > 0 && maxUnit === 5 /* Week */;
        var outputDays = (outputWeeks || daysInWeek > 0) && maxUnit >= 4 /* Day */;
        var outputHours = (outputDays || hours > 0) && maxUnit >= 3 /* Hour */;
        var outputMinutes = (outputHours || minutes > 0) && maxUnit >= 2 /* Minute */;
        var outputSeconds = (outputMinutes || seconds > 0) && maxUnit >= 1 /* Second */;
        var outputMilliseconds = (outputSeconds || milliseconds > 0) && maxUnit >= 0 /* Millisecond */;

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
        } else {
            result.push(formatter.TimeHumanizer_Zero());
        }
        return result;
    }

    function part(formatter, timeUnit, unit) {
        return unit !== 0 ? formatter.TimeHumanize(timeUnit, unit) : null;
    }
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=numberToTimeSpanExtension.js.map
