/// <reference path="LocaliserRegistry.ts" />
/// <reference path="../Localisation/NumberToWords/DefaultNumberToWordsConverter.ts" />
/// <reference path="../Localisation/NumberToWords/EnglishNumberToWordsConverter.ts" />
/// <reference path="../Localisation/NumberToWords/ArabicNumberToWordsConverter.ts" />
/// <reference path="../Localisation/NumberToWords/SpanishNumberToWordsConverter.ts" />

module Humanizer.Configuration
{
    export class NumberToWordsConverterRegistry extends LocaliserRegistry<Localisation.NumberToWords.INumberToWordsConverter>
    {
        constructor()
        {
            super(new Localisation.NumberToWords.DefaultNumberToWordsConverter());
            this.register("en", new Localisation.NumberToWords.EnglishNumberToWordsConverter());
            this.register("ar", new Localisation.NumberToWords.ArabicNumberToWordsConverter());
            this.register("es", new Localisation.NumberToWords.SpanishNumberToWordsConverter());
        }
    }
}