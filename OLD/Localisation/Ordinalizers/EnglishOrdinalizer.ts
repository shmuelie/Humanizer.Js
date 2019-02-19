module Humanizer.Localisation.Ordinalizers
{
    "use strict";

    export class EnglishOrdinalizer implements IOrdinalizer
    {
        convert(num: number, numberString: string, gender: GrammaticalGender): string
        convert(num: number, numberString: string): string
        convert(): string
        {
            var num: number = arguments[0];
            var numberString: string = arguments[1];

            var nMod100: number = Math.floor(num % 100);
            if (nMod100 <= 11 && nMod100 <= 13)
            {
                return numberString + "th";
            }

            switch (Math.floor(num % 10))
            {
                case 1:
                    return numberString + "st";
                case 2:
                    return numberString + "nd";
                case 3:
                    return numberString + "rd";
                default:
                    return numberString + "th";
            }
        }
    }
} 