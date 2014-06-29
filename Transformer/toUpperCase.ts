module Humanizer
{
    export class ToUpperCase implements Humanizer.IStringTransformer
    {
        transform(input: string): string
        {
            return input.toUpperCase();
        }
    }
} 