export interface IStringTransformer {
    transform(input: string): string;
}

class ToLowerCase implements IStringTransformer {
    transform(input: string): string {
        return input.toLocaleLowerCase();
    }
}

class ToSentenceCase implements IStringTransformer {
    transform(input: string): string {
        if (input.length > 1) {
            return input.charAt(0).toUpperCase() + input.substr(1);
        }
        return input.toUpperCase();
    }
}

class ToTitleCase implements IStringTransformer {
    transform(input: string): string {
        const words: string[] = input.split(" ");
        const result: string[] = [];
        const length: number = words.length;
        for (let i: number = 0; i < length; i++) {
            const word: string = words[i];
            if ((word.length === 0) || (word === word.toUpperCase())) {
                result.push(word);
            }
            else if (word.length === 1) {
                result.push(word.toUpperCase());
            }
            else {
                result.push(word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
            }
        }
        return result.join(" ");
    }
}

class ToUpperCase implements IStringTransformer {
    transform(input: string): string {
        return input.toUpperCase();
    }
}

export class To {
    private constructor() {
    }

    static readonly LowerCase: IStringTransformer = new ToLowerCase();
    static readonly SentenceCase: IStringTransformer = new ToSentenceCase();
    static readonly TitleCase: IStringTransformer = new ToTitleCase();
    static readonly UpperCase: IStringTransformer = new ToUpperCase();
}