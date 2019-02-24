import { GenderlessNumberToWordsConverter } from './GenderlessNumberToWordsConverter';

export class DefaultNumberToWordsConverter extends GenderlessNumberToWordsConverter {
    convert_number(num: number): string {
        return num.toString();
    }

    convertToOrdinal_number(num: number): string {
        return num.toString();
    }
}