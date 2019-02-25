import { TruncateFrom } from './common';

export interface ITruncator {
    /**
     * Truncate a string
     * @param {String} value The string to truncate
     * @param {Number} length The length to truncate to
     * @param {String} truncationString The string used to truncate with
     * @param {TruncateFrom} truncateFrom The enum value used to determine from where to truncate the string
     * @returns {String} The truncated string
     */
    truncate(value: string, length: number, truncationString: string, truncateFrom?: TruncateFrom): string;
}

class FixedLengthTruncator implements ITruncator {
    truncate(value: string, length: number, truncationString: string, truncateFrom: TruncateFrom = TruncateFrom.Right): string {
        if (value.length === 0) {
            return value;
        }

        if (truncationString === null || truncationString.length > length) {
            return truncateFrom === TruncateFrom.Right ? value.substr(0, length) : value.substr(value.length - length);
        }

        if (truncateFrom === TruncateFrom.Left) {
            return value.length > length ? truncationString + value.substr(value.length - length + truncationString.length) : value;
        }

        return value.length > length ? value.substr(0, length - truncationString.length) + truncationString : value;
    }
}

const charRegex = /[A-Za-z0-9]/;
class FixedNumberOfCharactersTruncator implements ITruncator {
    truncate(value: string, length: number, truncationString: string, truncateFrom: TruncateFrom = TruncateFrom.Right): string {
        if (value.length === 0) {
            return value;
        }

        if (truncationString === null || truncationString.length > length) {
            return truncateFrom === TruncateFrom.Right ? value.substr(0, length) : value.substr(value.length - length);
        }

        let alphaNumericalCharatersProcessed: number = 0;

        const match = value.match(charRegex);
        if (match && match.length <= length) {
            return value;
        }

        let i: number;
        if (truncateFrom = TruncateFrom.Left) {
            for (i = value.length - 1; i > 0; i--) {
                if (charRegex.test(value.charAt(i))) {
                    alphaNumericalCharatersProcessed++;
                }
                if (alphaNumericalCharatersProcessed + truncationString.length === length) {
                    return truncationString + value.substr(i);
                }
            }
        }

        for (i = 0; i < value.length - truncationString.length; i++) {
            if (charRegex.test(value.charAt(i))) {
                alphaNumericalCharatersProcessed++;
            }
            if (alphaNumericalCharatersProcessed + truncationString.length === length) {
                return value.substr(0, i + 1) + truncationString;
            }
        }

        return value;
    }
}

const whiteSpaceTest = /\s/;
const empty = /^\s*$/;

function truncateFromRight(value: string, length: number, truncationString: string): string {
    let lastCharactersWasWhiteSpace: boolean = true;
    let numberOfWordsProcessed: number = 0;
    for (let i: number = 0; i < value.length; i++) {
        if (whiteSpaceTest.test(value.charAt(i))) {
            if (!lastCharactersWasWhiteSpace) {
                numberOfWordsProcessed++;
            }

            lastCharactersWasWhiteSpace = true;

            if (numberOfWordsProcessed === length) {
                return value.substr(0, i) + truncationString;
            }
        }
        else {
            lastCharactersWasWhiteSpace = false;
        }
    }
    return value + truncationString;
}

function truncateFromLeft(value: string, length: number, truncationString: string): string {
    let lastCharactersWasWhiteSpace: boolean = true;
    let numberOfWordsProcessed: number = 0;
    for (let i: number = value.length - 1; i > 0; i--) {
        if (whiteSpaceTest.test(value.charAt(i))) {
            if (!lastCharactersWasWhiteSpace) {
                numberOfWordsProcessed++;
            }

            lastCharactersWasWhiteSpace = true;

            if (numberOfWordsProcessed === length) {
                return truncationString + value.substr(i + 1).trim();
            }
        }
        else {
            lastCharactersWasWhiteSpace = false;
        }

    }
    return truncationString + value;
}

class FixedNumberOfWordsTruncator implements ITruncator {
    truncate(value: string, length: number, truncationString: string, truncateFrom: TruncateFrom = TruncateFrom.Right): string {
        if (value.length === 0) {
            return value;
        }

        let numberOfWords: number = 0;
        const words: string[] = value.split(whiteSpaceTest);

        for (let i: number = 0; i < words.length; i++) {
            if (!empty.test(words[i])) {
                numberOfWords++;
            }
        }

        if (numberOfWords <= length) {
            return value;
        }

        return truncateFrom === TruncateFrom.Right ? truncateFromRight(value, length, truncationString) : truncateFromLeft(value, length, truncationString);
    }
}

export class Truncators {
    private constructor() {
    }

    static readonly FixedLength: ITruncator = new FixedLengthTruncator();
    static readonly FixedNumberOfCharacters: ITruncator = new FixedNumberOfCharactersTruncator();
    static readonly FixedNumberOfWords: ITruncator = new FixedNumberOfWordsTruncator();
}