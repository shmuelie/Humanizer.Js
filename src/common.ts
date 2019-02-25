/**
 * Units of time.
 * @enum
 * @readonly
 */
export enum TimeUnit {
    Millisecond,
    Second,
    Minute,
    Hour,
    Day,
    Week,
    Month,
    Year
}

export const enum Tense {
    Future,
    Past
}

/**
 * Options for specifying the desired grammatical gender for the output words
 * @enum
 */
export const enum GrammaticalGender {
    /**
     * Indicates masculine grammatical gender
     */
    Masculine,
    /**
     * Indicates feminine grammatical gender
     */
    Feminine,
    /**
     * Indicates neuter grammatical gender
     */
    Neuter
}

/**
 * Provides hint for Humanizer as to whether a word is singular, plural or with unknown plurality
 * @enum
 * @readonly
 */
export enum Plurality {
    /**
     * The word is singular
     */
    Singular,
    /**
     * The word is plural
     */
    Plural,
    /**
     * I am unsure of the plurality
     */
    CouldBeEither
}

export enum ShowQuantityAs {
    None,
    Numeric,
    Words
}

/**
 * @enum
 * @readonly
 */
export const enum LetterCasing {
    /** SomeString -> Some String */
    Title,
    /** SomeString -> SOME STRING */
    AllCaps,
    /** SomeString -> some string */
    LowerCase,
    /** SomeString -> Some string */
    Sentence
}

/**
 * Truncation location for humanizer
 * @enum
 * @readonly
 */
export enum TruncateFrom {
    /** Truncate letters from the left (start) of the string */
    Left,
    /** Truncate letters from the right (end) of the string */
    Right
}

/**
 *
 * @param members
 * @param $this
 * @internal
 */
export function extender(members: { [name: string]: Function }, $this: any): void {
    for (const name in members) {
        Object.defineProperty($this, name, {
            configurable: false,
            enumerable: true,
            value: function (this: any) { return (<Function>members[name].bind(undefined, this)).apply(undefined, arguments); },
            writable: false
        });
    }
}

/** @internal */
export interface RomanNumberalsDictionary {
    [letter: string]: number;
}

/** @internal */
export const romanNumberals: RomanNumberalsDictionary = {
    "M": 1000,
    "CM": 900,
    "D": 500,
    "CD": 400,
    "C": 100,
    "XC": 90,
    "L": 50,
    "XL": 40,
    "X": 10,
    "IX": 9,
    "V": 5,
    "IV": 4,
    "I": 1
};