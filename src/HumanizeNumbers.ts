import { GrammaticalGender } from './common';
import * as resources from './resources/resources';
import * as configuration from './configuration';

export interface ExtraNumber {
    toWords(): string;
    toWords(culture: string): string;
    toWords(culture: string, gender: GrammaticalGender): string;
    toOrdinalWords(): string;
    toOrdinalWords(culture: string): string;
    toOrdinalWords(culture: string, gender: GrammaticalGender): string;
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
    if ($this) {
        Object.defineProperties($this, {
            toWords: {
                configurable: false,
                enumerable: true,
                value: toWords,
                writable: false
            },
            toOrdinalWords: {
                configurable: false,
                enumerable: true,
                value: toOrdinalWords,
                writable: false
            }
        });
        return <ExtendedNumber>$this;
    }
    Object.defineProperties(Number.prototype, {
        toWords: {
            configurable: false,
            enumerable: true,
            value: function (this: ExtendedNumber, culture: string, gender: GrammaticalGender): string { return toWords(this, culture, gender); },
            writable: false
        },
        toOrdinalWords: {
            configurable: false,
            enumerable: true,
            value: function (this: ExtendedNumber, culture: string, gender: GrammaticalGender): string { return toOrdinalWords(this, culture, gender); },
            writable: false
        }
    });
}