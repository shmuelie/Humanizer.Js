(function ()
{
    "use strict";

    var Humanizer = {};

    if (define !== undefined)
    {
        define("Humanizer", [], function ()
        {
            return Humanizer;
        });
    }
    else
    {
        window.Humanizer = Humanizer;
    }

    //#region ArrayFixes

    if (!Array.prototype.indexOf)
    {
        Array.prototype.indexOf = function (item)
        {
            var length = this.length;
            for (var i = 0; i < length; i++)
            {
                if (item === this[i])
                {
                    return i;
                }
            }
            return -1;
        };
    }

    //#endregion

    //#region Stringixes

    if (!String.prototype.trim)
    {
        String.prototype.trim = function()
        {
            return this.replace(/^\s+|\s+$/g, "");
        };
    }

    //#endregion

    //#region OnNoMatch

    // Dictating what should be done when a match is not found - currently used only for DehumanizeTo
    Humanizer.OnNoMatch = {
        /// <field name="ThrowsException" type="Number" integer="true">This is the default behavior which throws a NoMatchFoundException</field>
        ThrowsException: 0,
        /// <field name="ReturnsNull" type="Number" integer="true">If set to ReturnsNull the method returns null instead of throwing an exception</field>
        ReturnsNull: 1
    }

    ///#endregion

    //#region OrdinalizeExtensions

    function ordinalize(number, numberString)
    {
        var nMod100 = number % 100;

        if (nMod100 >= 11 && nMod100 <= 13)
        {
            return numberString + "th";
        }

        switch (number % 10)
        {
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

    String.prototype.ordinalize = function ()
    {
        /// <summary>
        ///     Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th.
        /// </summary>

        ordinalize(Number(this), this);
    };

    Number.prototype.ordinalize = function ()
    {
        /// <summary>
        ///     Turns a number into an ordinal number used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th.
        /// </summary>

        ordinalize(this, this.toString());
    }

    //#endregion

    //#region LetterCasing

    Humanizer.LetterCasing = {
        /// <field name="Title" type="Number" integer="true">SomeString -> Some String</field>
        Title: 0,
        /// <field name="AllCaps" type="Number" integer="true">SomeString -> SOME STRING</field>
        AllCaps: 1,
        /// <field name="LowerCase" type="Number" integer="true">SomeString -> some string</field>
        LowerCase: 2,
        /// <field name="Sentence" type="Number" integer="true">SomeString -> Some string</field>
        Sentence: 3
    }

    //#endregion

    //#region ToTitleCase

    Humanizer.ToTitleCase = {
        transform: function (input)
        {
            var words = input.split(" ");
            var result = [];
            var length = words.length;
            for (var i = 0; i < lengthl i++)
            {
                var word = words[i];
                if ((word.length === 0) || (word === word.toUpperCase()))
                {
                    result.push(word);
                }
                else if (word.length === 1)
                {
                    result.push(word.toUpperCase());
                }
                else
                {
                    result.push(word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
                }
            }
        }
    }

    //#endregion

    //#region ToLowerCase

    Humanizer.ToLowerCase = {
        transform: function (input)
        {
            return input.toLocaleLowerCase();
        }
    }

    //#endregion

    //#region ToUpperCase

    Humanizer.ToUpperCase = {
        transform: function (input)
        {
            return input.toUpperCase();
        }
    }

    //#endregion

    //#region ToSentenceCase

    Humanizer.ToSentenceCase = {
        transform: function (input)
        {
            /// <param name="input" type="String" />
            if (input.length >= 1)
            {
                return input.charAt(0).toUpperCase() + input.substr(1);
            }
            return input.toUpperCase();
        }
    }

    //#endregion

    //#region To

    String.prototype.transform = function (transformers)
    {
        /// <summary>
        ///     Transforms a string using the provided transformers. Transformations are applied in the provided order.
        /// </summary>
        /// <param name="transformers" parameterArray="true" />

        var str = this;
        var length = arguments.length;
        for (var i = 0; i < length; i++)
        {
            str = arguments[i].transform(str);
        }
        return str;
    }

    Humanizer.To = {
        TitleCase: Humanizer.ToTitleCase,
        LowerCase: Humanizer.ToLowerCase,
        UpperCase: Humanizer.ToUpperCase,
        SentenceCase: Humanizer.ToSentenceCase
    }

    //#endregion

    //#region CasingExtentions

    String.prototype.applyCasing = function (casing)
    {
        /// <summary>
        ///     Changes the casing of the provided input
        /// </summary>
        /// <param name-"casing" type="Humanizer.LetterCasing" />

        switch (casing)
        {
            case Humanizer.LetterCasing.Title:
                return this.transform(Humanizer.To.TitleCase);
            case Humanizer.LetterCasing.LowerCase:
                return this.transform(Humanizer.To.LowerCase);
            case Humanizer.LetterCasing.AllCaps:
                return this.transform(Humanizer.To.UpperCase);
            case Humanizer.LetterCasing.Sentence:
                return this.transform(Humanizer.To.SentenceCase);
            default:
                throw new Error("casing");
        }
    };

    //#endregion

    //#region StringHumanizeExtensions

    function fromUnderscoreDashSeparatedWords(input)
    {
        return input.split(/[_-]/g, Number.MAX_VALUE).join(" ");
    }

    function fromPascalCase(input)
    {
        /// <param name="input" type="String" />
        var pascalCaseRegex = /(?:([A-Z][a-z]+)(?=[A-Z]))|(?:([a-z]+)(?=[A-Z]))|(?:(\d+))|(?:([A-Z][a-z]+))|([A-Z]+)/g;
        var matches = input.match(pascalCaseRegex) || [];
        var matchesLength = matches.length;
        for (var i = 0; i < matchesLength; i++)
        {
            var word = matches[i] || "";
            matches[i] = (word.toUpperCase() === word) && (word.length > 1) ? word : word.toLowerCase();
        }
        var result = matches.join(" ");
        result = result.charAt(0).toUpperCase() + result.substr(1);
        return result.replace(" i ", " I ");
    }

    function humanize(input)
    {
        if (input = input.toUpperCase())
        {
            return input;
        }

        if ((input.indexOf("_") !== -1) || (input.indexOf("-") !== -1))
        {
            return fromUnderscoreDashSeparatedWords(input);
        }

        return fromPascalCase(input);
    }

    String.prototype.humanize = function (casing)
    {
        /// <signature>
        ///     <summary>
        ///         Humanizes the input string; e.g. Underscored_input_String_is_turned_INTO_sentence -> 'Underscored input String is turned INTO sentence'
        ///     </summary>
        /// </signature>
        /// <signature>
        ///     <summary>
        ///         Humanized the input string based on the provided casing
        ///     </summary>
        ///     <param name="casing" type="Humanizer.LetterCasing">
        ///         The desired casing for the output
        ///     </param>
        /// </signature>

        if ((casing !== null) && (casing !== undefined))
        {
            return humanize(this).applyCasing(casing);
        }
        else
        {
            return humanize(this);
        }
    };

    //#endregion

    //#region InflectorExtensions

    // Provides hint for Humanizer as to whether a word is singular, plural or with unknown plurality
    Humanizer.Plurality = {
        /// <field name="Singular" type="Number" integer="true">The word is singular</field>
        Singular: 0,
        /// <filed name="Plural" type="Number" integer="true">The word is singular</filed>
        Plural: 1,
        /// <field name="CouldBeEither" type="Number" integer="true">I am unsure of the plurality</field>
        CouldBeEither: 2
    }

    function InflectorExtensions_Rule(pattern, replacement)
    {
        this._regex = new RegExp(pattern, "i");
        this._replacement = replacement;
    }

    InflectorExtensions_Rule.prototype.apply = function (word)
    {
        if (!this._regex.test(word))
        {
            return null;
        }
        return word.replace(this._regex, this._replacement);
    };

    var plurals = [];
    var singulars = [];
    var uncountables = [];

    function addUncountable(word)
    {
        uncountables.push(word);
    }

    function addSingular(rule, replacement)
    {
        singulars.push(new InflectorExtensions_Rule(rule, replacement));
    }

    function addPlural(rule, replacement)
    {
        plurals.push(new InflectorExtensions_Rule(rule, replacement));
    }

    function addIrregluar(singular, plural)
    {
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

    function applyRules(rules, word)
    {
        if (word === null)
        {
            return null;
        }

        var result = word;

        if (uncountables.indexOf(word.toLowerCase()) === -1)
        {
            for (var i = rules.length - 1; i >= 0; i--)
            {
                result = rules[i].apply(word);
                if (result !== null)
                {
                    break;
                }
            }
        }

        return result;
    }

    String.prototype.pluralize = function (plurality)
    {
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

        plurality = plurality || Humanizer.Plurality.Singular;

        if (plurality === Humanizer.Plurality.Plural)
        {
            return this;
        }

        var result = applyRules(plurals, this);

        if (plurality === Humanizer.Plurality.Singular)
        {
            return result;
        }

        var asSingular = applyRules(singulars, this);
        var asSingularAsPlural = applyRules(plurals, asSingular);
        if ((asSingular !== null) && (asSingular !== this) && (asSingular + "s" !== this) && (asSingularAsPlural !== this) && (result !== this))
        {
            return this;
        }
        return result;
    };

    String.prototype.singularize = function (plurality)
    {
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

        plurality = plurality || Humanizer.Plurality;

        if (plurality === Humanizer.Plurality.Singular)
        {
            return this;
        }

        var result = applyRules(singulars, this)

        if (plurality === Humanizer.Plurality.Plural)
        {
            return result;
        }

        // the Plurality is unknown so we should check all possibilities
        var asPlural = applyRules(plurals, this);
        var asPluralAsSingular = applyRules(singulars, asPlural);
        if ((asPlural !== this) && (this + "s" !== asPlural) && (asPluralAsSingular === this) && (result !== this))
        {
            return this;
        }

        return result || this;
    };

    String.prototype.Titleize = function ()
    {
        /// <summary>
        ///     Humanizes the input with Title casing
        /// </summary>

        return this.humanize(Humanizer.LetterCasing.Title);
    };

    String.prototype.pascalize = function()
    {
        /// <summary>
        ///     By default, pascalize converts strings to UpperCamelCase also removing underscores
        /// </summary>

        var words = this.split("_");
        var result = [];
        var length = words.length;
        for (var i = 0; i < length; i++)
        {
            var word = words[i];
            result.push(word.charAt(0).toUpperCase());
            result.push(word.substr(1));
        }
        return result.join("");
    };

    String.prototype.camelize = function ()
    {
        /// <summary>
        ///     Same as Pascalize except that the first character is lower case
        /// </summary>

        var word = this.pascalize();
        return word.charAt(0).toLowerCase() + word.substr(1);
    };

    String.prototype.underscore = function ()
    {
        /// <summary>
        ///     Separates the input words with underscore
        /// </summary>

        return this.replace(/([A-Z]+)([A-Z][a-z])/, "$1_$2").replace(/([a-z\d])([A-Z])/, "$1_$2").replace(/[-\s]/, "_").toLowerCase();
    }

    String.prototype.dasherize = function ()
    {
        /// <summary>
        ///     Replaces underscores with dashes in the string
        /// </summary>

        return this.replace("_", "-");
    }

    String.prototype.hyphenate = function ()
    {
        /// <summary>
        ///     Replaces underscores with hyphens in the string
        /// </summary>

        return this.dasherize();
    }

    //#endregion

    //#region NumberToWordsExtension

    function toEnglishWords(number)
    {
        if (number === 0)
        {
            return "zero";
        }

        if (number < 0)
        {
            return "minus " + Math.abs(number).toWords();
        }

        var parts = [];

        if ((number / 1000000000) > 0)
        {
            parts.push(Math.floor(number / 1000000000).toWords() + " billion");
            number %= 1000000000;
        }

        if ((number / 1000000) > 0)
        {
            parts.push(Math.floor(number / 1000000).toWords() + " million");
            number %= 1000000;
        }

        if ((number / 1000) > 0)
        {
            parts.push(Math.floor(number / 1000).toWords() + " thousand");
            number %= 1000
        }

        if ((number / 100) > 0)
        {
            parts.push(Math.floor(number / 100).toWords() + " hundred");
            number %= 100;
        }

        if (number > 0)
        {
            if (parts.length !==0)
            {
                parts.push("and");
            }

            var unitsMap = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
            var tensMap = ["zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

            if (number < 20)
            {
                parts.push(unitsMap[number]);
            }
            else
            {
                var lastPart = tensMap[Math.floor(number / 10)];
                if ((number % 10) > 0)
                {
                    lastPart += "-" + unitsMap[number % 10];
                }
                parts.push(lastPart);
            }
        }

        return parts.join(" ");
    }

    function toArabicWords(number)
    {
        var arabicGroup = [ "مئة", "ألف", "مليون", "مليار", "تريليون", "كوادريليون", "كوينتليون", "سكستيليون" ];
        var arabicAppendedGroup = [ "", "ألفاً", "مليوناً", "ملياراً", "تريليوناً", "كوادريليوناً", "كوينتليوناً", "سكستيليوناً" ];
        var arabicPluralGroups = [ "", "آلاف", "ملايين", "مليارات", "تريليونات", "كوادريليونات", "كوينتليونات", "سكستيليونات" ];
        var onesGroup = [ "", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة", "عشرة", "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر" ];
        var tensGroup = [ "", "عشرة", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون" ];
        var hundredsGroup = [ "", "مئة", "مئتان", "ثلاث مئة", "أربع مئة", "خمس مئة", "ست مئة", "سبع مئة", "ثمان مئة", "تسع مئة" ];
        var arabicAppendedTwos = [ "مئتان", "ألفان", "مليونان", "ملياران", "تريليونان", "كوادريليونان", "كوينتليونان", "سكستيليونلن" ];
        var arabicTwos = [ "مئتان", "ألفان", "مليونان", "ملياران", "تريليونان", "كوادريليونان", "كوينتليونان", "سكستيليونان" ];

        if (number === 0)
        {    
            return "صفر";
        }

        var result = "";
        var groupLevel = 0;

        while (number >= 1)
        {
            var groupNumber = number % 1000;
            number = Math.floor(number / 1000);

            var tens = groupNumber % 100;
            var hundreds = Math.floor(groupNumber / 100);
            var process = "";

            if (hundreds > 0)
            {
                if ((tens === 0) && (hundreds === 2))
                {
                    process = arabicAppendedTwos[0];
                }
                else
                {
                    process = hundredsGroup[hundreds];
                }
            }

            if (tens > 0)
            {
                if (tens < 20)
                {
                    if ((tens == 2) && (hundreds == 0) && (groupLevel > 0))
                    {
                        if ((number === 2000) || (number === 2000000) || (number === 2000000000))
                        {
                            process = arabicAppendedTwos[groupLevel];
                        }
                        else
                        {
                            process = arabicTwos[groupLevel];
                        }
                    }
                    else
                    {
                        if (process !== "")
                        {
                            process += " و ";
                        }

                        if ((tens === 1) && (groupLevel > 0) && (hundreds === 0))
                        {
                            process += " ";
                        }
                        else
                        {
                            process += onesGroup[tens];
                        }
                    }
                }
                else
                {
                    var ones = tens % 10;
                    tens = Math.floor(tens / 10);

                    if (ones > 0)
                    {
                        if (process !== "")
                        {
                            process += " و ";
                        }

                        process += onesGroup[ones];
                    }

                    if (process !== "")
                    {
                        process += " و ";
                    }

                    process += tensGroup[tens];
                }
            }

            if (process !== "")
            {
                if (groupLevel > 0)
                {
                    if (result !== "")
                    {
                        result = "و " + result;
                    }

                    if (groupNumber != 2)
                    {
                        if (groupNumber % 100 !== 1)
                        {
                            if (groupNumber >= 3)
                            {
                                result = arabicPluralGroups[groupLevel] + " " + result;
                            }
                            else
                            {
                                result = (result !== "" ? arabicAppendedGroup[groupLevel] : arabicGroup[groupLevel]) + " " + result;
                            }
                        }
                        else
                        {
                            result = arabicGroup[groupLevel] + " " + result;
                        }
                    }
                }

                result = process + " " + result;
            }

            groupLevel++;
        }

        return result.trim();
    }

    Number.prototype.toWords = function ()
    {
        /// <summary>
        ///     3501.ToWords() -> "three thousand five hundred and one"
        /// </summary>

        if (navigator.language.indexOf("ar") === 0)
        {
            return toArabicWords(this);
        }
        return toEnglishWords(this);
    };

    //#endregion

    //#region NumberToOrdinalWordsExtension

    function exceptionNumberToWords (number)
    {
        var exceptions = {
            1: "first",
            2: "second",
            3: "third",
            4: "fourth",
            5: "fifth",
            8: "eighth",
            9: "ninth",
            12: "twelfth"
        };
        if (exceptions.hasOwnProperty(number))
        {
            return exceptions[number];
        }
        return null;
    }

    function removeOnePrefix(towords)
    {
        if (towords.indexOf("one") === 0)
        {
            towords = towords.substr(4);
        }
        return towords;
    }

    function normalNumberToWords(number)
    {
        var towords = number.toWords().replace("-", " ");

        towords = removeOnePrefix(towords);

        if (towords.lastIndexOf("y") === towords.length - 1)
        {
            towords = towords.substr(0, towords.length - 1) + "ie";
        }

        return towords + "th";
    }

    Number.prototype.toOrdinalWords = function ()
    {
        /// <summary>
        ///     1.ToOrdinalWords() -> "first"
        /// </summary>

        var towords;

        var ex = exceptionNumberToWords(Number);
        if (ex !== null)
        {
            return ex;
        }

        if (this > 20)
        {
            var exceptionPart = exceptionNumberToWords(Number % 10);
            if (exceptionPart !== null)
            {
                var normalPart = this - this % 10;
                towords = removeOnePrefix(normalPart.toWords());
                return towords + " " + exceptionPart;
            }
        }

        return normalNumberToWords(this);
    };

    //#endregion
}());