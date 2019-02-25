import { IDateHumanizeStrategy } from './localization';
import * as DateTimeHumanizeAlgorithms from './DateTimeHumanizeAlgorithms';

export class DefaultDateHumanizeStrategy implements IDateHumanizeStrategy {
    /**
     * Calculates the distance of time in words between two provided dates
     */
    humanize(input: Date, comparisonBase: Date, culture: string): string {
        return DateTimeHumanizeAlgorithms.defaultHumanize(input, comparisonBase, culture);
    }
}