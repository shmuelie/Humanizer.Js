import * as Resources from '../resources/resources';
import { GrammaticalGender, TimeUnit, Tense } from "../common";

interface LocalizerDictionary<T> {
    [key: string]: (culture: string) => T;
}

/** @internal */
export type Localizer<T> = (culture: string) => T

/** @internal */
export class LocaliserRegistry<T>
{
    private readonly localizer: LocalizerDictionary<T>;
    private readonly defaultLocalizer: Localizer<T>;

    constructor(_default: T) {
        this.localizer = {};
        this.defaultLocalizer = (): T => {
            return _default;
        };
    }

    resolveForCulture(culture: string = Resources.getCurrentCulture()): T {
        return this.findLocaliser(culture)(culture);
    }

    register(culture: string, localiser: T): void
    register(culture: string, func: (c: string) => T): void
    register(culture: string, other: T | Localizer<T>): void {
        if (typeof other === "function") {
            this.localizer[culture] = <Localizer<T>>other;
        }
        else {
            this.localizer[culture] = (): T => { return <T>other; };
        }
    }

    private findLocaliser(culture: string): (culture: string) => T {
        let localiser: (culture: string) => T = this.localizer[culture];
        if (localiser !== undefined) {
            return localiser;
        }
        culture = culture.substr(0, 2);
        localiser = this.localizer[culture];
        if (localiser !== undefined) {
            return localiser;
        }
        return this.defaultLocalizer;
    }
}

/**
 * An interface you should implement to localize Humanize for collections
 */
export interface ICollectionFormatter {
    /**
     * Formats the collection for display, calling toString() on each object.
     */
    humanize<T>(collection: T[]): string;
    /**
     * Formats the collection for display, calling `objectFormatter` on each object.
     */
    humanize<T>(collection: T[], objectFormatter: (item: T) => string): string;
    /**
     * Formats the collection for display, calling toString() on each object and using `separator` before the final item.
     */
    humanize<T>(collection: T[], separator: string): string;
    /**
     * Formats the collection for display, calling `objectFormatter` on each object and using `separator` before the final item.
     */
    humanize<T>(collection: T[], objectFormatter: (item: T) => string, separator: string): string;
}

export type CollectionFormatterRegistry = LocaliserRegistry<ICollectionFormatter>;

export interface IFormatter {
    DateHumanize_Now(): string;
    DateHumanize(timeunit: TimeUnit, timeUnitTense: Tense, unit: number): string;
    TimeHumanizer_Zero(): string;
    TimeHumanize(timeunit: TimeUnit, unit: number): string;
}

export type FormatterRegistry = LocaliserRegistry<IFormatter>;

/**
 * An interface you should implement to localise ToWords and ToOrdinalWords methods
 */
export interface INumberToWordsConverter {
    /**
     * Converts the number to string using the locale's default grammatical gender
     */
    convert(num: number): string;
    /**
     * Converts the number to string using the provided grammatical gender
     */
    convert(num: number, gender: GrammaticalGender): string;
    /**
     * Converts the number to ordinal string using the locale's default grammatical gender
     */
    convertToOrdinal(num: number): string;
    /**
     * Converts the number to ordinal string using the provided grammatical gender
     */
    convertToOrdinal(num: number, gender: GrammaticalGender): string;
}

export type NumberToWordsRegistry = LocaliserRegistry<INumberToWordsConverter>;

/**
 * The interface used to localise the Ordinalize method
 */
export interface IOrdinalizer {
    /**
     * Ordinalizes the number
     */
    convert(num: number, numberString: string): string;
    /**
     * Ordinalizes the number using the provided grammatical gender
     */
    convert(num: number, numberString: string, gender: GrammaticalGender): string;
}

export type OrdinalizerRegistry = LocaliserRegistry<IOrdinalizer>;