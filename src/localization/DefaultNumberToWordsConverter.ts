import { GenderlessNumberToWordsConverter } from './GenderlessNumberToWordsConverter';

/** @internal */
export class DefaultNumberToWordsConverter extends GenderlessNumberToWordsConverter {
    protected convert_number(num: number): string {
        return num.toString();
    }

    protected convertToOrdinal_number(num: number): string {
        return num.toString();
    }
}