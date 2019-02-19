/// <reference path="FormatterRegistry.ts" />
/// <reference path="OrdinalizerRegistry.ts" />
/// <reference path="CollectionFormatterRegistry.ts" />
/// <reference path="NumberToWordsConverterRegistry.ts" />
/// <reference path="../DateHumanizeStrategy/DefaultDateHumanizeStrategy.ts" />

module Humanizer.Configuration.Configurator
{
    "use strict";

    var formatter: LocaliserRegistry<Localisation.Formatter.IFormatter> = new FormatterRegistry();
    var ordinalizers: LocaliserRegistry<Localisation.Ordinalizers.IOrdinalizer> = new OrdinalizerRegistry();
    var collections: LocaliserRegistry<Localisation.CollectionFormatters.ICollectionFormatter> = new CollectionFormatterRegistry();
    var numberToWords: LocaliserRegistry<Localisation.NumberToWords.INumberToWordsConverter> = new NumberToWordsConverterRegistry();

    export function getFormatter(culture: string): Localisation.Formatter.IFormatter
    {
        return formatter.resolveForCulture(culture);
    }

    export function getOrdinalizer(): Localisation.Ordinalizers.IOrdinalizer
    {
        return ordinalizers.resolveForCulture(Resources.getCurrentCulture());
    }

    export function getCollectionFormatters(): Localisation.CollectionFormatters.ICollectionFormatter
    {
        return collections.resolveForCulture(Resources.getCurrentCulture());
    }

    export function getNumberToWordsConverter(culture: string): Localisation.NumberToWords.INumberToWordsConverter
    {
        return numberToWords.resolveForCulture(culture);
    }

    export var dateHumanizeStrategy: DateHumanizeStrategy.IDateHumanizeStrategy = new DateHumanizeStrategy.DefaultDateHumanizeStrategy();
}