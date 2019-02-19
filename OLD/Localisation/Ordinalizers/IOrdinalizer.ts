module Humanizer.Localisation.Ordinalizers
{
    /**
     * The interface used to localise the Ordinalize method
     */
    export interface IOrdinalizer
    {
        /**
         * Ordinalizes the number 
         */
        convert(num: number, numberString: string): string;
        /**
         * Ordinalizes the number using the provided grammatical gender
         */
        convert(num: number, numberString: string, gender: GrammaticalGender): string;
    }
}