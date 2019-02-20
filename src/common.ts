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