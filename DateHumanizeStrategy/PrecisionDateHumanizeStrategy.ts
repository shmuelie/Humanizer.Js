module Humanizer.DateHumanizeStrategy
{
    "use strict";

    export class PrecisionDateHumanizeStrategy implements IDateHumanizeStrategy
    {
        private precision: number;

        constructor(precision: number = 0.75)
        {
            this.precision = precision;
        }

        humanize(input: Date, comparisonBase: Date, culture: string): string
        {
            var tense: Localisation.Tense = input > comparisonBase ? Localisation.Tense.Future : Localisation.Tense.Past;
            var ts: number = Math.abs(comparisonBase.getTime() - input.getTime());

            var days: number = ts.toDays();
            var weeks: number = Math.floor(days / 7);
            var daysInWeek: number = days % 7;
            ts = ts - (weeks * 7 + daysInWeek).milliseconds();
            var hours: number = Math.floor(ts.toHours());
            ts = ts - hours.toMilliseconds();
            var minutes: number = Math.floor(ts.toMinutes());
            ts = ts - minutes.milliseconds();
            var seconds: number = Math.floor(ts.toSeconds());
            var milliseconds: number = ts - seconds.milliseconds();
            var years: number = 0;
            var months: number = 0;

            if (milliseconds >= 999 * this.precision)
            {
                seconds++;
            }
            if (seconds >= 59 * this.precision)
            {
                minutes++;
            }
            if (minutes >= 59 * this.precision)
            {
                hours++;
            }
            if (hours >= 23 * this.precision)
            {
                days++;
            }

            if (days >= 30 * this.precision && days <= 30)
            {
                months = 1;
            }
            if (days > 31 && days < 365 * this.precision)
            {
                var factor: number = Math.floor(days / 30);
                var maxMonths: number = Math.ceil(days / 30);
                months = (days >= 30 * (factor + this.precision)) ? maxMonths : maxMonths - 1;
            }

            if (days >= 365 * this.precision && days <= 366)
            {
                years = 1;
            }
            if (days > 365)
            {
                var factor: number = Math.floor(days / 365);
                var maxMonths: number = Math.ceil(days / 365);
                years = (days >= 365 * (factor + this.precision)) ? maxMonths : maxMonths - 1;
            }

            var formatter: Localisation.Formatter.IFormatter = Configuration.Configurator.getFormatter(culture);
            if (years > 0)
            {
                return formatter.DateHumanize(Localisation.TimeUnit.Year, tense, years);
            }
            if (months > 0)
            {
                return formatter.DateHumanize(Localisation.TimeUnit.Month, tense, months);
            }
            if (days > 0)
            {
                return formatter.DateHumanize(Localisation.TimeUnit.Day, tense, days);
            }
            if (hours > 0)
            {
                return formatter.DateHumanize(Localisation.TimeUnit.Hour, tense, hours);
            }
            if (minutes > 0)
            {
                return formatter.DateHumanize(Localisation.TimeUnit.Minute, tense, minutes);
            }
            if (seconds > 0)
            {
                return formatter.DateHumanize(Localisation.TimeUnit.Second, tense, seconds);
            }
            return formatter.DateHumanize(Localisation.TimeUnit.Millisecond, tense, 0);
        }
    }
} 