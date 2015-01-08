module Humanizer
{
    "use strict";

    var whiteSpaceTest = /\s/;
    var empty = /^\s*$/;

    function truncateFromRight(value: string, length: number, truncationString: string): string
    {
        var lastCharactersWasWhiteSpace: boolean = true;
        var numberOfWordsProcessed: number = 0;
        for (var i: number = 0; i < value.length; i++)
        {
            if (whiteSpaceTest.test(value.charAt(i)))
            {
                if (!lastCharactersWasWhiteSpace)
                {
                    numberOfWordsProcessed++;
                }

                lastCharactersWasWhiteSpace = true;

                if (numberOfWordsProcessed === length)
                {
                    return value.substr(0, i) + truncationString;
                }
            }
            else
            {
                lastCharactersWasWhiteSpace = false;
            }
        }
        return value + truncationString;
    }

    function truncateFromLeft(value: string, length: number, truncationString: string): string
    {
        var lastCharactersWasWhiteSpace: boolean = true;
        var numberOfWordsProcessed: number = 0;
        for (var i: number = value.length - 1; i > 0; i--)
        {
            if (whiteSpaceTest.test(value.charAt(i)))
            {
                if (!lastCharactersWasWhiteSpace)
                {
                    numberOfWordsProcessed++;
                }

                lastCharactersWasWhiteSpace = true;

                if (numberOfWordsProcessed === length)
                {
                    return truncationString + value.substr(i + 1).trim();
                }
            }
            else
            {
                lastCharactersWasWhiteSpace = false;
            }

        }
        return truncationString + value;
    }

    export class FixedNumberOfWordsTruncator implements ITruncator
    {
        truncate(value: string, length: number, truncationString: string, truncateFrom: TruncateFrom = TruncateFrom.Right): string
        {
            if (value === null)
            {
                return null;
            }

            if (value.length === 0)
            {
                return value;
            }

            var numberOfWords: number = 0;
            var words: string[] = value.split(whiteSpaceTest);

            for (var i: number = 0; i < words.length; i++)
            {
                if (!empty.test(words[i]))
                {
                    numberOfWords++;
                }
            }

            if (numberOfWords <= length)
            {
                return value;
            }

            return truncateFrom === TruncateFrom.Right ? truncateFromRight(value, length, truncationString) : truncateFromLeft(value, length, truncationString);
        }
    }
} 