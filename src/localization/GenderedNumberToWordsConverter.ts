import { INumberToWordsConverter } from './localization';
import { GrammaticalGender } from '../common';

export class GenderedNumberToWordsConverter implements INumberToWordsConverter {
    private defaultGender: GrammaticalGender;

    constructor(defaultGender: GrammaticalGender = GrammaticalGender.Masculine) {
        this.defaultGender = defaultGender;
    }

    convert(num: number): string;
    convert(num: number, gender: GrammaticalGender): string;
    convert(num: number, gender?: GrammaticalGender): string {
        if (gender) {
            return this.convert_number_grammaticalGender(num, gender);
        }
        return this.convert_number(num);
    }

    convertToOrdinal(num: number): string;
    convertToOrdinal(num: number, gender: GrammaticalGender): string;
    convertToOrdinal(num: number, gender?: GrammaticalGender): string {
        if (gender) {
            return this.convertToOrdinal_number_grammaticalGender(num, gender);
        }
        return this.convertToOrdinal_number(num);
    }

    protected convert_number(num: number): string {
        return this.convert_number_grammaticalGender(num, this.defaultGender);
    }

    protected convert_number_grammaticalGender(_num: number, _gender: GrammaticalGender): string {
        throw new Error("Abstract");
    }

    protected convertToOrdinal_number(num: number): string {
        return this.convertToOrdinal_number_grammaticalGender(num, this.defaultGender);
    }

    protected convertToOrdinal_number_grammaticalGender(_num: number, _gender: GrammaticalGender): string {
        throw new Error("Abstract");
    }
}