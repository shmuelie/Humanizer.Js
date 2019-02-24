import { INumberToWordsConverter } from './localization';
import { GrammaticalGender } from '../common';

export class GenderlessNumberToWordsConverter implements INumberToWordsConverter {
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

    protected convert_number(_num: number): string {
        throw new Error("Abstract");
    }

    protected convert_number_grammaticalGender(num: number, _gender: GrammaticalGender): string {
        return this.convert_number(num);
    }

    protected convertToOrdinal_number(_num: number): string {
        throw new Error("Abstract");
    }

    protected convertToOrdinal_number_grammaticalGender(num: number, _gender: GrammaticalGender): string {
        return this.convertToOrdinal_number(num);
    }
}