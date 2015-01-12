module Humanizer.Localisation.NumberToWords
{
    "use strict";

    export class GenderedNumberToWordsConverter implements INumberToWordsConverter
    {
        private defaultGender: GrammaticalGender;

        constructor(defaultGender: GrammaticalGender = GrammaticalGender.Masculine)
        {
            this.defaultGender = defaultGender;
        }

        convert(num: number, gender: GrammaticalGender): string
        convert(num: number): string
        convert(): string
        {
            if (arguments.length === 1)
            {
                return this.convert_number(arguments[0]);
            }
            return this.convert_number_grammaticalGender(arguments[0], arguments[1]);
        }

        convertToOrdinal(num: number, gender: GrammaticalGender): string
        convertToOrdinal(num: number): string
        convertToOrdinal(): string
        {
            if (arguments.length === 1)
            {
                return this.convertToOrdinal_number(arguments[0]);
            }
            return this.convertToOrdinal_number_grammaticalGender(arguments[0], arguments[1]);
        }

        convert_number(num: number): string
        {
            return this.convert_number_grammaticalGender(num, this.defaultGender);
        }

        convert_number_grammaticalGender(num: number, gender: GrammaticalGender): string
        {
            throw new Error("Abstract");
        }

        convertToOrdinal_number(num: number): string
        {
            return this.convertToOrdinal_number_grammaticalGender(num, this.defaultGender);
        }

        convertToOrdinal_number_grammaticalGender(num: number, gender: GrammaticalGender): string
        {
            throw new Error("Abstract");
        }
    }
}