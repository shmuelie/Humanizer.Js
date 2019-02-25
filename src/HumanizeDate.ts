import { extender } from './common';
import * as resources from './resources/resources';
import * as configuration from './configuration';

export interface ExtraDate {
    at(hour: number, min?: number, second?: number, millisecond?: number): Date;
    atMidnight(): Date;
    atNoon(): Date;
    in(year: number): Date;
    humanize(dateToCompareAgainst?: Date, culture?: string): string;
}

export type ExtendedDate = ExtraDate & Date;

export function humanize($this: Date, dateToCompareAgainst: Date = new Date(), culture: string = resources.getCurrentCulture()): string {
    return configuration.dateStrategy.humanize($this, dateToCompareAgainst, culture);
}

export function at($this: Date, hour: number, min: number = 0, second: number = 0, millisecond: number = 0): Date {
    return new Date($this.getFullYear(), $this.getMonth(), $this.getDate(), hour, min, second, millisecond);
}

export function atMidnight($this: Date): Date {
    return at($this, 0);
}

export function atNoon($this: Date): Date {
    return at($this, 12);
}

export function inYear($this: Date, year: number): Date {
    return new Date(year, $this.getMonth(), $this.getDate(), $this.getHours(), $this.getSeconds(), $this.getMilliseconds());
}

export function extend(): void;
export function extend($this: Date): ExtendedDate;
export function extend($this?: Date): void | ExtendedDate {
    const members = {
        at: at,
        atMidnight: atMidnight,
        atNoon: atNoon,
        inYear: inYear,
        humanize: humanize
    }
    if ($this) {
        extender(members, $this);
        return <ExtendedDate>$this;
    }
    extender(members, $this);
}