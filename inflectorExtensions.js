var Humanizer;
(function (Humanizer) {
    "use strict";
    /**
     * Provides hint for Humanizer as to whether a word is singular, plural or with unknown plurality
     * @enum
     * @readonly
     */
    (function (Plurality) {
        /**
         * The word is singular
         */
        Plurality[Plurality["Singular"] = 0] = "Singular";
        /**
         * The word is plural
         */
        Plurality[Plurality["Plural"] = 1] = "Plural";
        /**
         * I am unsure of the plurality
         */
        Plurality[Plurality["CouldBeEither"] = 2] = "CouldBeEither";
    })(Humanizer.Plurality || (Humanizer.Plurality = {}));
    var Plurality = Humanizer.Plurality;
    var InflectorExtensionsRule = (function () {
        function InflectorExtensionsRule(pattern, replacement) {
            this.regex = new RegExp(pattern, "i");
            this.replacement = replacement;
        }
        InflectorExtensionsRule.prototype.apply = function (word) {
            if (!this.regex.test(word)) {
                return null;
            }
            return word.replace(this.regex, this.replacement);
        };
        return InflectorExtensionsRule;
    })();
    var plurals = [];
    var singulars = [];
    var uncountables = [];
    function addUncountable(word) {
        uncountables.push(word);
    }
    function addSingular(rule, replacement) {
        singulars.push(new InflectorExtensionsRule(rule, replacement));
    }
    function addPlural(rule, replacement) {
        plurals.push(new InflectorExtensionsRule(rule, replacement));
    }
    function addIrregluar(singular, plural) {
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
    function applyRules(rules, word) {
        if (word === null) {
            return null;
        }
        var result = word;
        if (uncountables.indexOf(word.toLowerCase()) === -1) {
            for (var i = rules.length - 1; i >= 0; i--) {
                result = rules[i].apply(word);
                if (result !== null) {
                    break;
                }
            }
        }
        return result;
    }
    /**
     * Pluralizes the provided input considering irregular words
     * @param {Humanizer.Plurality} [plurality=Humanizer.Plurality.Singular] Normally you call Pluralize on singular words; but if you're unsure call it with Plurality.CouldBeEither
     */
    String.prototype.pluralize = function (plurality) {
        /// <signature>
        ///     <summary>
        ///         Pluralizes the provided input considering irregular words
        ///     </summary>
        /// </signature>
        /// <signature>
        ///     <summary>
        ///         Pluralizes the provided input considering irregular words
        ///     </summary>
        ///     <param name="plurality" type="Humanizer.Plurality">
        ///         Normally you call Pluralize on singular words; but if you're unsure call it with Plurality.CouldBeEither
        ///     </param>
        /// </signature>
        if (plurality === void 0) { plurality = 0 /* Singular */; }
        if (plurality === 1 /* Plural */) {
            return this;
        }
        var result = applyRules(plurals, this);
        if (plurality === 0 /* Singular */) {
            return result;
        }
        var asSingular = applyRules(singulars, this);
        var asSingularAsPlural = applyRules(plurals, asSingular);
        if ((asSingular !== null) && (asSingular !== this) && (asSingular + "s" !== this) && (asSingularAsPlural !== this) && (result !== this)) {
            return this;
        }
        return result;
    };
    /**
     * Singularizes the provided input considering irregular words.
     * @param {Humanizer.Plurality} [plurality=Humanizer.Plurality.Plural] Normally you call Singularize on plural words; but if you're unsure call it with Plurality.CouldBeEither
     */
    String.prototype.singularize = function (plurality) {
        /// <signature>
        ///     <summary>
        ///         Singularizes the provided input considering irregular words.
        ///     </summary>
        /// </signature>
        /// <signature>
        ///     <summary>
        ///         Singularizes the provided input considering irregular words
        ///     </summary>
        ///     <param name="plurality" type="Humanizer.Plurality">
        ///         Normally you call Singularize on plural words; but if you're unsure call it with Plurality.CouldBeEither
        ///     </param>
        /// </signature>
        if (plurality === void 0) { plurality = 1 /* Plural */; }
        if (plurality === 0 /* Singular */) {
            return this;
        }
        var result = applyRules(singulars, this);
        if (plurality === 1 /* Plural */) {
            return result;
        }
        // the Plurality is unknown so we should check all possibilities
        var asPlural = applyRules(plurals, this);
        var asPluralAsSingular = applyRules(singulars, asPlural);
        if ((asPlural !== this) && (this + "s" !== asPlural) && (asPluralAsSingular === this) && (result !== this)) {
            return this;
        }
        return result || this;
    };
    /**
     * Humanizes the input with Title casing
     */
    String.prototype.titleize = function () {
        /// <summary>
        ///     Humanizes the input with Title casing
        /// </summary>
        return this.humanize(0 /* Title */);
    };
    /**
     * By default, pascalize converts strings to UpperCamelCase also removing underscores
     */
    String.prototype.pascalize = function () {
        /// <summary>
        ///     By default, pascalize converts strings to UpperCamelCase also removing underscores
        /// </summary>
        var words = this.split("_");
        var result = [];
        var length = words.length;
        for (var i = 0; i < length; i++) {
            var word = words[i];
            result.push(word.charAt(0).toUpperCase());
            result.push(word.substr(1));
        }
        return result.join("");
    };
    /**
     * Same as Pascalize except that the first character is lower case
     */
    String.prototype.camelize = function () {
        /// <summary>
        ///     Same as Pascalize except that the first character is lower case
        /// </summary>
        var word = this.pascalize();
        return word.charAt(0).toLowerCase() + word.substr(1);
    };
    /**
     * Separates the input words with underscore
     */
    String.prototype.underscore = function () {
        /// <summary>
        ///     Separates the input words with underscore
        /// </summary>
        return this.replace(/([A-Z]+)([A-Z][a-z])/, "$1_$2").replace(/([a-z\d])([A-Z])/, "$1_$2").replace(/[-\s]/, "_").toLowerCase();
    };
    /**
     * Replaces underscores with dashes in the string
     */
    String.prototype.dasherize = function () {
        /// <summary>
        ///     Replaces underscores with dashes in the string
        /// </summary>
        return this.replace("_", "-");
    };
    /**
     * Replaces underscores with hyphens in the string
     */
    String.prototype.hyphenate = function () {
        /// <summary>
        ///     Replaces underscores with hyphens in the string
        /// </summary>
        return this.dasherize();
    };
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=inflectorExtensions.js.map