module Humanizer
{
    export interface IStringTransformer
    {
        transform(input: string): string
    }
} 