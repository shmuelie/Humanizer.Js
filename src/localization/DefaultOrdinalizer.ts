import { IOrdinalizer } from './localization';
import { GrammaticalGender } from '../common';

export class DefaultOrdinalizer implements IOrdinalizer {
    convert(num: number, numberString: string): string;
    convert(num: number, numberString: string, gender: GrammaticalGender): string;
    convert(_num: number, numberString: string, _gender?: GrammaticalGender): string {
        return numberString;
    }
}