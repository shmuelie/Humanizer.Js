import { GrammaticalGender, extender, TimeUnit, romanNumberals } from './common';
import * as resources from './resources/resources';
import * as configuration from './configuration';
import { IFormatter } from './localization/localization';

export interface ExtraNumber {
    toWords(): string;
    toWords(culture: string): string;
    toWords(culture: string, gender: GrammaticalGender): string;
    toOrdinalWords(): string;
    toOrdinalWords(culture: string): string;
    toOrdinalWords(culture: string, gender: GrammaticalGender): string;
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
    time(percision?: number, countEmptyUnits?: boolean, culture?: string, maxUnit?: TimeUnit): string;
    ordinalize(gender: GrammaticalGender): string;
    ordinalize(): string;
    toRoman(): string;
}

export type ExtendedNumber = ExtraNumber & number;

const MILLIS_PER_SECOND: number = 1000;
const MILLIS_PER_MINUTE: number = MILLIS_PER_SECOND * 60;
const MILLIS_PER_HOUR: number = MILLIS_PER_MINUTE * 60;
const MILLIS_PER_DAY: number = MILLIS_PER_HOUR * 24;

export function toRoman($this: number): string {
    const minValue: number = 1;
    const maxValue: number = 3999;

    if (($this < minValue) || ($this > maxValue)) {
        throw new Error("Out of range");
    }

    const sb: string[] = [];
    let input: number = $this;

    for (const key in romanNumberals) {
        if (Object.prototype.hasOwnProperty.call(romanNumberals, key)) {
            const value: number = romanNumberals[key];
            while (input / value > 0) {
                sb.push(key);
                input -= value;
            }
        }
    }

    return sb.join("");
}

export function ordinalize($this: number): string;
export function ordinalize($this: number, gender: GrammaticalGender): string;
export function ordinalize($this: number, gender?: GrammaticalGender): string {
    if (gender) {
        configuration.getOrdinalizer().convert($this, $this.toString(), gender);
    }
    return configuration.getOrdinalizer().convert($this, $this.toString());
}

export function days($this: number): number {
    return $this * MILLIS_PER_DAY;
}

export function weeks($this: number): number {
    return days($this * 7);
}

export function hours($this: number): number {
    return $this * MILLIS_PER_HOUR;
}

export function minutes($this: number): number {
    return $this * MILLIS_PER_MINUTE;
}

export function seconds($this: number): number {
    return $this * MILLIS_PER_SECOND;
}

export function milliseconds($this: number): number {
    return $this;
}

export function toDays($this: number): number {
    return $this / MILLIS_PER_DAY;
}

export function toWeeks($this: number): number {
    return toDays($this / 7);
}

export function toHours($this: number): number {
    return $this / MILLIS_PER_HOUR;
}

export function toMinutes($this: number): number {
    return $this / MILLIS_PER_MINUTE;
}

export function toSeconds($this: number): number {
    return $this / MILLIS_PER_SECOND;
}

export function toMilliseconds($this: number): number {
    return $this;
}

function part(formatter: IFormatter, timeUnit: TimeUnit, unit: number): string | null {
    return unit !== 0 ? formatter.TimeHumanize(timeUnit, unit) : null;
}

function parts(timespan: number, culture: string, maxUnit: TimeUnit): (string | null)[] {
    const days: number = timespan / MILLIS_PER_DAY;
    const weeks: number = Math.floor(days / 7);
    const daysInWeek: number = maxUnit > TimeUnit.Day ? days % 7 : Math.floor(days);
    if (maxUnit > TimeUnit.Hour) {
        timespan = timespan - ((weeks * 7 + daysInWeek) * MILLIS_PER_DAY);
    }
    const hours: number = Math.floor(timespan / MILLIS_PER_HOUR);
    if (maxUnit > TimeUnit.Minute) {
        timespan = timespan - (hours * MILLIS_PER_HOUR);
    }
    const minutes: number = Math.floor(timespan / MILLIS_PER_MINUTE);
    if (maxUnit > TimeUnit.Second) {
        timespan = timespan - (minutes * MILLIS_PER_MINUTE);
    }
    const seconds: number = Math.floor(timespan / MILLIS_PER_SECOND);
    const milliseconds: number = maxUnit === TimeUnit.Millisecond ? timespan : timespan - (seconds * MILLIS_PER_SECOND);

    const outputWeeks: boolean = weeks > 0 && maxUnit === TimeUnit.Week;
    const outputDays: boolean = (outputWeeks || daysInWeek > 0) && maxUnit >= TimeUnit.Day;
    const outputHours: boolean = (outputDays || hours > 0) && maxUnit >= TimeUnit.Hour;
    const outputMinutes: boolean = (outputHours || minutes > 0) && maxUnit >= TimeUnit.Minute;
    const outputSeconds: boolean = (outputMinutes || seconds > 0) && maxUnit >= TimeUnit.Second;
    const outputMilliseconds: boolean = (outputSeconds || milliseconds > 0) && maxUnit >= TimeUnit.Millisecond;

    const result: (string | null)[] = [];
    const formatter: IFormatter = configuration.getFormatter(culture);
    if (outputWeeks) {
        result.push(part(formatter, TimeUnit.Week, weeks));
    }
    if (outputDays) {
        result.push(part(formatter, TimeUnit.Day, days));
    }
    if (outputHours) {
        result.push(part(formatter, TimeUnit.Hour, hours));
    }
    if (outputMinutes) {
        result.push(part(formatter, TimeUnit.Minute, minutes));
    }
    if (outputSeconds) {
        result.push(part(formatter, TimeUnit.Second, seconds));
    }
    if (outputMilliseconds) {
        result.push(part(formatter, TimeUnit.Millisecond, milliseconds));
    }
    else {
        result.push(formatter.TimeHumanizer_Zero());
    }
    return result;
}

export function time($this: number, percision: number = 1, countEmptyUnits: boolean = false, culture: string = resources.getCurrentCulture(), maxUnit: TimeUnit = TimeUnit.Week): string {
    const timeParts: (string | null)[] = parts($this, culture, maxUnit);
    let i = 0;
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
}

export function toWords($this: number): string;
export function toWords($this: number, culture: string): string;
export function toWords($this: number, culture: string, gender: GrammaticalGender): string;
export function toWords($this: number, culture?: string, gender?: GrammaticalGender): string {
    const converter = configuration.getNumberToWordsConverter(culture || resources.getCurrentCulture());
    if (gender) {
        return converter.convert($this, gender);
    }
    return converter.convert($this);
}

export function toOrdinalWords($this: number): string;
export function toOrdinalWords($this: number, culture: string): string;
export function toOrdinalWords($this: number, culture: string, gender: GrammaticalGender): string;
export function toOrdinalWords($this: number, culture?: string, gender?: GrammaticalGender): string {
    const converter = configuration.getNumberToWordsConverter(culture || resources.getCurrentCulture());
    if (gender) {
        return converter.convertToOrdinal($this, gender);
    }
    return converter.convertToOrdinal($this);
}

export function extend(): void;
export function extend($this: number): ExtendedNumber
export function extend($this?: number): ExtendedNumber | void {
    const members = {
        toWords: toWords,
        toOrdinalWords: toOrdinalWords,
        days: days,
        weeks: weeks,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds,
        toDays: toDays,
        toWeeks: toWeeks,
        toHours: toHours,
        toMinutes: toMinutes,
        toSeconds: toSeconds,
        toMilliseconds: toMilliseconds,
        time: time,
        ordinalize: ordinalize,
        toRoman: toRoman
    };
    if ($this) {
        extender(members, $this);
        return <ExtendedNumber>$this;
    }
    extender(members, Number.prototype);
}