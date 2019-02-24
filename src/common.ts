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