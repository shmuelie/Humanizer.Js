import * as localization from './localization/localization';
import * as resources from './resources/resources';
import { DefaultCollectionFormatter } from './localization/DefaultCollectionFormatter';
import { OxfordStyleCollectionFormatter } from './localization/OxfordStyleCollectionFormatter';
import { DefaultFormatter } from './localization/DefaultFormatter';
import { ArabicNumberToWordsConverter } from './localization/ArabicNumberToWordsConverter';
import { DefaultNumberToWordsConverter } from './localization/DefaultNumberToWordsConverter';
import { EnglishNumberToWordsConverter } from './localization/EnglishNumberToWordsConverter';
import { SpanishNumberToWordsConverter } from './localization/SpanishNumberToWordsConverter';
import { DefaultOrdinalizer } from './localization/DefaultOrdinalizer';
import { EnglishOrdinalizer } from './localization/EnglishOrdinalizer';

const collectionRegistry: localization.CollectionFormatterRegistry = new localization.LocaliserRegistry(new DefaultCollectionFormatter());
collectionRegistry.register("en", new OxfordStyleCollectionFormatter());

const formatterRegistry: localization.FormatterRegistry = new localization.LocaliserRegistry(new DefaultFormatter("en-US"));

const numberToWordsRegistry: localization.NumberToWordsRegistry = new localization.LocaliserRegistry(new DefaultNumberToWordsConverter());
numberToWordsRegistry.register("en", new EnglishNumberToWordsConverter());
numberToWordsRegistry.register("ar", new ArabicNumberToWordsConverter());
numberToWordsRegistry.register("es", new SpanishNumberToWordsConverter());

const ordinalizerRegistry: localization.OrdinalizerRegistry = new localization.LocaliserRegistry(new DefaultOrdinalizer());
ordinalizerRegistry.register("en", new EnglishOrdinalizer());

/** @internal */
export function getCollectionFormatter(): localization.ICollectionFormatter {
    return collectionRegistry.resolveForCulture(resources.getCurrentCulture());
}

/**
 *
 * @param culture
 * @internal
 */
export function getFormatter(culture: string): localization.IFormatter {
    return formatterRegistry.resolveForCulture(culture);
}

/**
 *
 * @param culture
 * @internal
 */
export function getNumberToWordsConverter(culture: string): localization.INumberToWordsConverter {
    return numberToWordsRegistry.resolveForCulture(culture);
}

/** @internal */
export function getOrdinalizer(): localization.IOrdinalizer {
    return ordinalizerRegistry.resolveForCulture(resources.getCurrentCulture());
}