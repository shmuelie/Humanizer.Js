module Humanizer
{
    "use strict";

    export class ToSentenceCase implements Humanizer.IStringTransformer
    {
        transform(input: string): string
        {
            if (input.length > 1)
            {
                return input.charAt(0).toUpperCase() + input.substr(1);
            }
            return input.toUpperCase();
        }
    }
}