module Humanizer
{
    "use strict";

    var charRegex = /[A-Za-z0-9]/;
    export class FixedNumberOfCharactersTruncator implements ITruncator
    {
        truncate(value: string, length: number, truncationString: string, truncateFrom: TruncateFrom = TruncateFrom.Right): string
        {
            if (!value)
            {
                return null;
            }

            if (value.length === 0)
            {
                return value;
            }

            if (truncationString === null || truncationString.length > length)
            {
                return truncateFrom === TruncateFrom.Right ? value.substr(0, length) : value.substr(value.length - length);
            }

            var alphaNumericalCharatersProcessed: number = 0;

            if (value.match(charRegex).length <= length)
            {
                return value;
            }

            var i: number;
            if (truncateFrom = TruncateFrom.Left)
            {
                for (i = value.length - 1; i > 0; i--)
                {
                    if (charRegex.test(value.charAt(i)))
                    {
                        alphaNumericalCharatersProcessed++;
                    }
                    if (alphaNumericalCharatersProcessed + truncationString.length === length)
                    {
                        return truncationString + value.substr(i);
                    }
                }
            }

            for (i = 0; i < value.length - truncationString.length; i++)
            {
                if (charRegex.test(value.charAt(i)))
                {
                    alphaNumericalCharatersProcessed++;
                }
                if (alphaNumericalCharatersProcessed + truncationString.length === length)
                {
                    return value.substr(0, i + 1) + truncationString;
                }
            }

            return value;
        }
    }
}