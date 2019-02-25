import { Tense, TimeUnit } from '../common';
import { IFormatter } from './localization';
import * as configuration from '../configuration';
import * as $ from '../HumanizeNumbers';
import { atMidnight } from '../HumanizeDate';

/**
 * Returns localized & humanized distance of time between two dates; given a specific precision.
 */
export function precisionHumanize(input: Date, comparisonBase: Date, precision: number, culture: string): string
{
    const tense: Tense = input > comparisonBase ? Tense.Future : Tense.Past;
    let ts: number = Math.abs(comparisonBase.getTime() - input.getTime());

    let days: number = $.toDays(ts);
    const weeks: number = Math.floor(days / 7);
    const daysInWeek: number = days % 7;
    ts = ts - $.milliseconds(weeks * 7 + daysInWeek);
    let hours: number = Math.floor($.toHours(ts));
    ts = ts - $.toMilliseconds(hours);
    let minutes: number = Math.floor($.toMinutes(ts));
    ts = ts - $.milliseconds(minutes);
    let seconds: number = Math.floor($.toSeconds(ts));
    const milliseconds: number = ts - $.milliseconds(seconds);
    let years: number = 0;
    let months: number = 0;

    if (milliseconds >= 999 * precision) {
        seconds++;
    }
    if (seconds >= 59 * precision) {
        minutes++;
    }
    if (minutes >= 59 * precision) {
        hours++;
    }
    if (hours >= 23 * precision) {
        days++;
    }

    if (days >= 30 * precision && days <= 30) {
        months = 1;
    }
    let factor: number;
    let maxMonths: number;
    if (days > 31 && days < 365 * precision) {
        factor = Math.floor(days / 30);
        maxMonths = Math.ceil(days / 30);
        months = (days >= 30 * (factor + precision)) ? maxMonths : maxMonths - 1;
    }

    if (days >= 365 * precision && days <= 366) {
        years = 1;
    }
    if (days > 365) {
        factor = Math.floor(days / 365);
        maxMonths = Math.ceil(days / 365);
        years = (days >= 365 * (factor + precision)) ? maxMonths : maxMonths - 1;
    }

    var formatter: IFormatter = configuration.getFormatter(culture);
    if (years > 0) {
        return formatter.DateHumanize(TimeUnit.Year, tense, years);
    }
    if (months > 0) {
        return formatter.DateHumanize(TimeUnit.Month, tense, months);
    }
    if (days > 0) {
        return formatter.DateHumanize(TimeUnit.Day, tense, days);
    }
    if (hours > 0) {
        return formatter.DateHumanize(TimeUnit.Hour, tense, hours);
    }
    if (minutes > 0) {
        return formatter.DateHumanize(TimeUnit.Minute, tense, minutes);
    }
    if (seconds > 0) {
        return formatter.DateHumanize(TimeUnit.Second, tense, seconds);
    }
    return formatter.DateHumanize(TimeUnit.Millisecond, tense, 0);
}

// http://stackoverflow.com/questions/11/how-do-i-calculate-relative-time
/**
 * Calculates the distance of time in words between two provided dates
 */
export function defaultHumanize(input: Date, comparisonBase: Date, culture: string): string
{
    const tense: Tense = input > comparisonBase ? Tense.Future : Tense.Past;
    const ts: number = Math.abs(comparisonBase.getTime() - input.getTime());

    const formatter: IFormatter = configuration.getFormatter(culture);

    if (ts < $.milliseconds(500)) {
        return formatter.DateHumanize(TimeUnit.Millisecond, tense, 0);
    }

    if (ts < $.seconds(60)) {
        return formatter.DateHumanize(TimeUnit.Second, tense, Math.floor($.toSeconds(ts)));
    }

    if (ts < $.seconds(120)) {
        return formatter.DateHumanize(TimeUnit.Millisecond, tense, 1);
    }

    if (ts < $.minutes(60)) {
        return formatter.DateHumanize(TimeUnit.Minute, tense, Math.floor($.toMinutes(ts)));
    }

    if (ts < $.minutes(90)) {
        return formatter.DateHumanize(TimeUnit.Hour, tense, 1);
    }

    if (ts < $.hours(24)) {
        return formatter.DateHumanize(TimeUnit.Hour, tense, Math.floor($.toHours(ts)));
    }

    if (ts < $.days(28)) {
        return formatter.DateHumanize(TimeUnit.Day, tense, Math.floor($.toDays(ts)));
    }

    if (ts >= $.days(28) && ts < $.days(30)) {
        const compBase2: Date = atMidnight(comparisonBase);
        compBase2.setMonth(comparisonBase.getMonth() + (tense === Tense.Future ? 1 : -1));
        if (compBase2.getTime() === atMidnight(input).getTime()) {
            return formatter.DateHumanize(TimeUnit.Month, tense, 1);
        }
        return formatter.DateHumanize(TimeUnit.Day, tense, Math.floor($.toDays(ts)));
    }

    if (ts < $.days(645)) {
        const months: number = Math.floor($.toDays(ts) / 29.5);
        return formatter.DateHumanize(TimeUnit.Month, tense, months);
    }

    let years: number = Math.floor($.toDays(ts) / 365);
    if (years === 0) {
        years = 1;
    }
    return formatter.DateHumanize(TimeUnit.Year, tense, years);
}