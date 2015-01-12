module Humanizer.Localisation.NumberToWords
{
    /**
     * An interface you should implement to localise ToWords and ToOrdinalWords methods
     */
    export interface INumberToWordsConverter
    {
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
} 