import { ShowQuantityAs, Plurality, LetterCasing, extender, GrammaticalGender, romanNumberals, TruncateFrom } from './common';
import { toWords } from './HumanizeNumbers';
import { applyRules, plurals, singulars } from './Inflector';
import { IStringTransformer, To } from './transformers';
import * as configuration from './configuration';
import { ITruncator, Truncators } from './truncators';

export interface ExtraString {
    pluralize(plurality: Plurality): string | null;
    pluralize(isKnownToBeSingular?: boolean): string | null;
    singularize(plurality: Plurality): string | null;
    singularize(isKnownToBePlural?: boolean): string | null;
    titleize(): string;
    pascalize(): string;
    camelize(): string;
    underscore(): string;
    dasherize(): string;
    hyphenate(): string;
    toQuantity(quantity: number, showQuantityAs?: ShowQuantityAs): string;
    humanize(): string;
    humanize(casing: LetterCasing): string;
    applyCasing(casing: LetterCasing): string;
    transform(...transformers: IStringTransformer[]): string;
    ordinalize(gender: GrammaticalGender): string;
    ordinalize(): string;
    fromRoman(): number;
    dehumanize(): string;
    truncate(length: number): string;
    truncate(length: number, truncator: ITruncator, from?: TruncateFrom): string;
    truncate(length: number, truncationString: string, from?: TruncateFrom): string;
    truncate(length: number, truncationString: string, truncator: ITruncator, from?: TruncateFrom): string;
}

export type ExtendedString = string & ExtraString;

const validRomanNumerals: RegExp = /^(?:(?=[MDCLXVI])((M{0,3})((C[DM])|(D?C{0,3}))?((X[LC])|(L?XX{0,2})|L)?((I[VX])|(V?(II{0,2}))|V)?))$/;

function fromUnderscoreDashSeparatedWords(input: string): string {
    return input.split(/[_-]/g, Number.MAX_VALUE).join(" ");
}

function fromPascalCase(input: string): string {
    const pascalCaseRegex: RegExp = /(?:([A-Z][a-z]+)(?=[A-Z]))|(?:([a-z]+)(?=[A-Z]))|(?:(\d+))|(?:([A-Z][a-z]+))|([A-Z]+)/g;
    const matches: string[] = input.match(pascalCaseRegex) || [];
    const matchesLength: number = matches.length;
    for (let i: number = 0; i < matchesLength; i++) {
        const word: string = matches[i] || "";
        matches[i] = (word.toUpperCase() === word) && (word.length > 1) ? word : word.toLowerCase();
    }
    let result: string = matches.join(" ");
    result = result.charAt(0).toUpperCase() + result.substr(1);
    return result.replace(" i ", " I ");
}

function _humanize(input: string): string {
    if (input === input.toUpperCase()) {
        return input;
    }

    if ((input.indexOf("_") !== -1) || (input.indexOf("-") !== -1)) {
        return fromUnderscoreDashSeparatedWords(input);
    }

    return fromPascalCase(input);
}

export function truncate($this: string, length: number): string;
export function truncate($this: string, length: number, truncator: ITruncator,    from?: TruncateFrom): string;
export function truncate($this: string, length: number, truncationString: string, from?: TruncateFrom): string;
export function truncate($this: string, length: number, truncationString: string, truncator: ITruncator, from?: TruncateFrom): string;
export function truncate($this: string, length: number, truncatorOrTruncationString?: ITruncator | string, fromOrTruncator?: TruncateFrom | ITruncator, from?: TruncateFrom): string {
    let truncationString: string = "�";
    let truncator: ITruncator = Truncators.FixedLength;
    if (truncatorOrTruncationString) {
        if (typeof truncatorOrTruncationString === "string") {
            truncationString = truncatorOrTruncationString;
        }
        else {
            truncator = truncatorOrTruncationString;
        }
    }
    if (fromOrTruncator) {
        if (typeof fromOrTruncator === "number") {
            from = fromOrTruncator;
        }
        else {
            truncator = fromOrTruncator;
        }
    }
    if (!from) {
        from = TruncateFrom.Right;
    }
    return truncator.truncate($this, length, truncationString, from);
}

export function dehumanize($this: string): string {
    const titlizedWords: string[] = $this.split(" ");
    const length: number = titlizedWords.length;
    for (let i: number = 0; i < length; i++) {
        titlizedWords[i] = humanize(titlizedWords[i], LetterCasing.Title);
    }
    return titlizedWords.join("").replace(" ", "");
}

export function fromRoman($this: string): number {
    const input: string = $this.toUpperCase().trim();
    const length: number = input.length;

    if ((length === 0) || !validRomanNumerals.test(input)) {
        throw new Error("Empty or invalid Roman numeral string.");
    }

    let total: number = 0;
    let i: number = length;

    while (i > 0) {
        let digit = romanNumberals[input.charAt(--i)];

        if (i > 0) {
            const previousDigit: number = romanNumberals[input.charAt(i - 1)];

            if (previousDigit < digit) {
                digit -= previousDigit;
                i--;
            }
        }
        total += digit;
    }

    return total;
}

export function ordinalize($this: string): string;
export function ordinalize($this: string, gender: GrammaticalGender): string;
export function ordinalize($this: string, gender?: GrammaticalGender): string {
    if (gender) {
        return configuration.getOrdinalizer().convert(parseInt($this, 10), $this, gender);
    }
    return configuration.getOrdinalizer().convert(parseInt($this, 10), $this);
}

export function transform($this: string, ...transformers: IStringTransformer[]): string {
    const length: number = transformers.length;
    for (let i: number = 0; i < length; i++) {
        $this = transformers[i].transform($this);
    }
    return $this;
}

export function applyCasing($this: string, casing: LetterCasing): string {
    switch (casing) {
        case LetterCasing.AllCaps:
            return transform($this, To.UpperCase);
        case LetterCasing.LowerCase:
            return transform($this, To.LowerCase);
        case LetterCasing.Sentence:
            return transform($this, To.SentenceCase);
        case LetterCasing.Title:
            return transform($this, To.TitleCase);
    }
}

export function humanize($this: string): string;
export function humanize($this: string, casing: LetterCasing): string;
export function humanize($this: string, casing?: LetterCasing): string {
    const result = _humanize($this);
    if (casing) {
        return applyCasing(result, casing);
    }
    return result;
}

export function toQuantity($this: string, quantity: number, showQuantityAs: ShowQuantityAs = ShowQuantityAs.None): string {
    const transformedInput: string = (quantity === 1 ? singularize($this, false) : pluralize($this, false)) || $this;

    switch (showQuantityAs) {
        case ShowQuantityAs.None:
            return transformedInput;
        case ShowQuantityAs.Numeric:
            return quantity.toString() + transformedInput;
        case ShowQuantityAs.Words:
            return toWords(quantity) + transformedInput;
    }
}

export function pluralize($this: string, plurality: Plurality): string | null;
export function pluralize($this: string, isKnownToBeSingular?: boolean): string | null;
export function pluralize($this: string, puluralityOrIsKnownToBeSingular?: Plurality | boolean): string | null {
    if (puluralityOrIsKnownToBeSingular === Plurality.Plural) {
        return $this;
    }

    const result: string | null = applyRules(plurals, $this);

    if (puluralityOrIsKnownToBeSingular === Plurality.Singular || puluralityOrIsKnownToBeSingular === true) {
        return result;
    }

    const asSingular: string | null = applyRules(singulars, $this);
    const asSingularAsPlural: string | null = applyRules(plurals, asSingular);
    if ((asSingular !== null) && (asSingular !== $this) && (asSingular + "s" !== $this) && (asSingularAsPlural !== $this) && (result !== $this)) {
        return $this;
    }
    return result;
}

export function singularize($this: string, plurality: Plurality): string | null;
export function singularize($this: string, isKnownToBePlural?: boolean): string | null;
export function singularize($this: string, pluralityOrIsKnownToBePlural?: Plurality | boolean): string | null {
    if (pluralityOrIsKnownToBePlural === Plurality.Singular) {
        return $this;
    }

    const result: string | null = applyRules(singulars, $this);

    if (pluralityOrIsKnownToBePlural === Plurality.Plural || pluralityOrIsKnownToBePlural === true) {
        return result;
    }

    // the Plurality is unknown so we should check all possibilities
    const asPlural: string | null = applyRules(plurals, $this);
    const asPluralAsSingular: string | null = applyRules(singulars, asPlural);
    if ((asPlural !== $this) && ($this + "s" !== asPlural) && (asPluralAsSingular === $this) && (result !== $this)) {
        return $this;
    }

    return result || $this;
}

export function titleize($this: string): string {
    return humanize($this, LetterCasing.Title);
}

export function pascalize($this: string): string {
    const words: string[] = $this.split("_");
    const result: string[] = [];
    const length: number = words.length;
    for (var i: number = 0; i < length; i++) {
        var word: string = words[i];
        result.push(word.charAt(0).toUpperCase());
        result.push(word.substr(1));
    }
    return result.join("");
}

export function camelize($this: string): string {
    const word: string = pascalize($this);
    return word.charAt(0).toLowerCase() + word.substr(1);
}

export function underscore($this: string): string {
    return $this.replace(/([A-Z]+)([A-Z][a-z])/, "$1_$2").replace(/([a-z\d])([A-Z])/, "$1_$2").replace(/[-\s]/, "_").toLowerCase();
}

export function dasherize($this: string): string {
    return $this.replace("_", "-");
}

export function hyphenate($this: string): string {
    return dasherize($this);
}

export function extend(): void;
export function extend($this: string): ExtendedString;
export function extend($this?: string): void | ExtendedString {
    const members = {
        pluralize: pluralize,
        singularize: singularize,
        titleize: titleize,
        pascalize: pascalize,
        camelize: camelize,
        underscore: underscore,
        dasherize: dasherize,
        hyphenate: hyphenate,
        toQuantity: toQuantity,
        humanize: humanize,
        applyCasing: applyCasing,
        transform: transform,
        ordinalize: ordinalize,
        fromRoman: fromRoman,
        dehumanize: dehumanize,
        truncate: truncate
    };
    if ($this) {
        extender(members, $this);
        return <ExtendedString>$this;
    }
    extender(members, String.prototype);
}