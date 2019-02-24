class InflectorExtensionsRule {
    private regex: RegExp;
    private replacement: string;
    constructor(pattern: string, replacement: string) {
        this.regex = new RegExp(pattern, "i");
        this.replacement = replacement;
    }

    apply(word: string): string | null {
        if (!this.regex.test(word)) {
            return null;
        }
        return word.replace(this.regex, this.replacement);
    }
}

/** @internal */
export const plurals: InflectorExtensionsRule[] = [];
/** @internal */
export const singulars: InflectorExtensionsRule[] = [];
/** @internal */
export const uncountables: string[] = [];

function addUncountable(word: string): void {
    uncountables.push(word);
}

function addSingular(rule: string, replacement: string): void {
    singulars.push(new InflectorExtensionsRule(rule, replacement));
}

function addPlural(rule: string, replacement: string): void {
    plurals.push(new InflectorExtensionsRule(rule, replacement));
}

function addIrregluar(singular: string, plural: string): void {
    addPlural("(" + singular.charAt(0) + ")" + singular.substr(1) + "$", "\\1" + plural.substr(1));
    addSingular("(" + plural.charAt(0) + ")" + plural.substr(1) + "$", "\\1" + singular.substr(1));
}

addPlural("$", "s");
addPlural("s$", "s");
addPlural("(ax|test)is$", "\\1es");
addPlural("(octop|vir|alumn|fung)us$", "\\1i");
addPlural("(alias|status)$", "\\1es");
addPlural("(bu)s$", "\\1ses");
addPlural("(buffal|tomat|volcan)o$", "\\1oes");
addPlural("([ti])um$", "\\1a");
addPlural("sis$", "ses");
addPlural("(?:([^f])fe|([lr])f)$", "\\1\\2ves");
addPlural("(hive)$", "\\1s");
addPlural("([^aeiouy]|qu)y$", "\\1ies");
addPlural("(x|ch|ss|sh)$", "\\1es");
addPlural("(matr|vert|ind)ix|ex$", "\\1ices");
addPlural("([m|l])ouse$", "\\1ice");
addPlural("^(ox)$", "\\1en");
addPlural("(quiz)$", "\\1zes");
addPlural("(campus)$", "$1es");
addPlural("^is$", "are");

addSingular("s$", "");
addSingular("(n)ews$", "\\1ews");
addSingular("([ti])a$", "\\1um");
addSingular("((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$", "\\1\\2sis");
addSingular("(^analy)ses$", "\\1sis");
addSingular("([^f])ves$", "\\1fe");
addSingular("(hive)s$", "\\1");
addSingular("(tive)s$", "\\1");
addSingular("([lr])ves$", "\\1f");
addSingular("([^aeiouy]|qu)ies$", "\\1y");
addSingular("(s)eries$", "\\1eries");
addSingular("(m)ovies$", "\\1ovie");
addSingular("(x|ch|ss|sh)es$", "\\1");
addSingular("([m|l])ice$", "\\1ouse");
addSingular("(bus)es$", "\\1");
addSingular("(o)es$", "\\1");
addSingular("(shoe)s$", "\\1");
addSingular("(cris|ax|test)es$", "\\1is");
addSingular("(octop|vir|alumn|fung)i$", "\\1us");
addSingular("(alias|status)es$", "\\1");
addSingular("^(ox)en", "\\1");
addSingular("(vert|ind)ices$", "\\1ex");
addSingular("(matr)ices$", "\\1ix");
addSingular("(quiz)zes$", "\\1");
addSingular("(campus)es$", "$1");
addSingular("^are$", "is");

addIrregluar("person", "people");
addIrregluar("man", "men");
addIrregluar("child", "children");
addIrregluar("sex", "sexes");
addIrregluar("move", "moves");
addIrregluar("goose", "geese");
addIrregluar("alumna", "alumnae");

addUncountable("equipment");
addUncountable("information");
addUncountable("rice");
addUncountable("money");
addUncountable("species");
addUncountable("series");
addUncountable("fish");
addUncountable("sheep");
addUncountable("deer");
addUncountable("aircraft");

/**
 *
 * @param rules
 * @param word
 * @internal
 */
export function applyRules(rules: Array<InflectorExtensionsRule>, word: string | null): string | null {
    if (word === null) {
        return null;
    }

    let result: string | null = word;

    if (uncountables.indexOf(word.toLowerCase()) === -1) {
        for (let i: number = rules.length - 1; i >= 0; i--) {
            result = rules[i].apply(word);
            if (result !== null) {
                break;
            }
        }
    }

    return result;
}