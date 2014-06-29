module Humanizer
{
    export class ToLowerCase implements Humanizer.IStringTransformer
    {
        transform(input: string): string
        {
            return input.toLocaleLowerCase();
        }
    }
} 