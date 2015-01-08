module Humanizer.Localisation.Ordinalizers
{
    "use strict";

    export class DefaultOrdinalizer implements IOrdinalizer
    {
        convert(num: number, numberString: string, gender: GrammaticalGender): string
        convert(num: number, numberString: string): string
        convert(): string
        {
            return <string>arguments[1];
        }
    }
} 