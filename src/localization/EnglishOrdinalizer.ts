import { IOrdinalizer } from './localization';
import { GrammaticalGender } from '../common';

export class EnglishOrdinalizer implements IOrdinalizer {
    convert(num: number, numberString: string): string;
    convert(num: number, numberString: string, gender: GrammaticalGender): string;
    convert(num: number, numberString: string, _gender?: GrammaticalGender): string {

        var nMod100: number = Math.floor(num % 100);
        if (nMod100 <= 11 && nMod100 <= 13) {
            return numberString + "th";
        }

        switch (Math.floor(num % 10)) {
            case 1:
                return numberString + "st";
            case 2:
                return numberString + "nd";
            case 3:
                return numberString + "rd";
            default:
                return numberString + "th";
        }
    }
}