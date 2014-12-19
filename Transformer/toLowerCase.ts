module Humanizer
{
    "use strict";

    export class ToLowerCase implements Humanizer.IStringTransformer
    {
        transform(input: string): string
        {
            return input.toLocaleLowerCase();
        }
    }
} 