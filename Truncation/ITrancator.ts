module Humanizer
{
    export interface ITruncator
    {
        /**
         * Truncate a string
         * @param {String} value The string to truncate
         * @param {Number} length The length to truncate to
         * @param {String} truncationString The string used to truncate with
         * @param {Humanizer.TruncateFrom} truncateFrom The enum value used to determine from where to truncate the string
         * @returns {String} The truncated string
         */
        truncate(value: string, length: number, truncationString: string, truncateFrom?: TruncateFrom): string;
    }
}