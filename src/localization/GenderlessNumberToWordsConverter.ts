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

    convert_number(_num: number): string {
        throw new Error("Abstract");
    }

    convert_number_grammaticalGender(num: number, _gender: GrammaticalGender): string {
        return this.convert_number(num);
    }

    convertToOrdinal_number(_num: number): string {
        throw new Error("Abstract");
    }

    convertToOrdinal_number_grammaticalGender(num: number, _gender: GrammaticalGender): string {
        return this.convertToOrdinal_number(num);
    }
}