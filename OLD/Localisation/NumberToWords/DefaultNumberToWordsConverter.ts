/// <reference path="GenderlessNumberToWordsConverter.ts" />

module Humanizer.Localisation.NumberToWords
{
    "use strict";

    export class DefaultNumberToWordsConverter extends GenderlessNumberToWordsConverter
    {
        convert_number(num: number): string
        {
            return num.toString();
        }

        convertToOrdinal_number(num: number): string
        {
            return num.toString();
        }
    }
}