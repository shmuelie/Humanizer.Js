module Humanizer
{
    "use strict";

    export class FixedLengthTruncator implements ITruncator
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

            if (truncateFrom === TruncateFrom.Left)
            {
                return value.length > length ? truncationString + value.substr(value.length - length + truncationString.length) : value;
            }

            return value.length > length ? value.substr(0, length - truncationString.length) + truncationString : value;
        }
    }
} 