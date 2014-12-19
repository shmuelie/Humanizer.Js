module Humanizer
{
    "use strict";

    export class ToTitleCase implements Humanizer.IStringTransformer
    {
        transform(input: string): string
        {
            var words: Array<string> = input.split(" ");
            var result: Array<string> = [];
            var length: number = words.length;
            for (var i: number = 0; i < length; i++)
            {
                var word: string = words[i];
                if ((word.length === 0) || (word === word.toUpperCase()))
                {
                    result.push(word);
                }
                else if (word.length === 1)
                {
                    result.push(word.toUpperCase());
                }
                else
                {
                    result.push(word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
                }
            }
            return result.join(" ");
        }
    }
} 