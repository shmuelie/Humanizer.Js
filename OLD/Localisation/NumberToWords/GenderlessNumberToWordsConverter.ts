module Humanizer.Localisation.NumberToWords
{
    "use strict";

    export class GenderlessNumberToWordsConverter implements INumberToWordsConverter
    {
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
            throw new Error("Abstract");
        }

        convert_number_grammaticalGender(num: number, gender: GrammaticalGender): string
        {
            return this.convert_number(num);
        }

        convertToOrdinal_number(num: number): string
        {
            throw new Error("Abstract");
        }

        convertToOrdinal_number_grammaticalGender(num: number, gender: GrammaticalGender): string
        {
            return this.convertToOrdinal_number(num);
        }
    }
} 