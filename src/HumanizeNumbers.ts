import { GrammaticalGender, extender } from './common';
import * as resources from './resources/resources';
import * as configuration from './configuration';

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
    time(percision?: number, countEmptyUnits?: boolean): string;
}

export type ExtendedNumber = ExtraNumber & number;

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
        toOrdinalWords: toOrdinalWords
    };
    if ($this) {
        extender(members, $this);
        return <ExtendedNumber>$this;
    }
    extender(members, Number.prototype);
}