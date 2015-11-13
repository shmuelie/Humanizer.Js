var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Humanizer;
(function (Humanizer) {
    var Localisation;
    (function (Localisation) {
        var NumberToWords;
        (function (NumberToWords) {
            "use strict";
            var unitsMap = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
            var tensMap = ["zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
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
            function getUnitValue(num, isOrdinal) {
                if (isOrdinal) {
                    var exception = exceptions[num];
                    if (exception) {
                        return exception;
                    }
                    else {
                        return unitsMap[num] + "th";
                    }
                }
                else {
                    return unitsMap[num];
                }
            }
            function removeOnePrefix(toWords) {
                if (toWords.indexOf("one") === 0) {
                    return toWords.substr(4);
                }
                return toWords;
            }
            function convert(num, isOrdinal) {
                if (num === 0) {
                    return getUnitValue(0, isOrdinal);
                }
                if (num < 0) {
                    return "minus " + convert(-num, false);
                }
                var parts = [];
                if ((num / 1000000000) > 0) {
                    parts.push(convert(Math.floor(num / 1000000000), false) + " billion");
                    num %= 1000000000;
                }
                if ((num / 1000000) > 0) {
                    parts.push(convert(Math.floor(num / 1000000), false) + " million");
                    num %= 1000000;
                }
                if ((num / 1000) > 0) {
                    parts.push(convert(Math.floor(num / 1000), false) + " thousand");
                    num %= 1000;
                }
                if ((num / 100) > 0) {
                    parts.push(convert(Math.floor(num / 100), false) + " hundred");
                    num %= 100;
                }
                if (num > 0) {
                    if (parts.length !== 0) {
                        parts.push("and");
                    }
                    if (num < 20) {
                        parts.push(getUnitValue(num, isOrdinal));
                    }
                    else {
                        var lastPart = tensMap[Math.floor(num / 10)];
                        if ((num % 10) > 0) {
                            lastPart += "-" + getUnitValue(num % 10, isOrdinal);
                        }
                        else if (isOrdinal && lastPart.indexOf("y") === lastPart.length - 1) {
                            lastPart = lastPart.substr(0, lastPart.length - 1) + "ieth";
                        }
                        parts.push(lastPart);
                    }
                }
                else if (isOrdinal) {
                    parts[parts.length - 1] += "th";
                }
                var toWords = parts.join(" ");
                if (isOrdinal) {
                    toWords = removeOnePrefix(toWords);
                }
                return toWords;
            }
            var EnglishNumberToWordsConverter = (function (_super) {
                __extends(EnglishNumberToWordsConverter, _super);
                function EnglishNumberToWordsConverter() {
                    _super.apply(this, arguments);
                }
                EnglishNumberToWordsConverter.prototype.convert_number = function (num) {
                    return convert(num, false);
                };
                EnglishNumberToWordsConverter.prototype.convertToOrdinal_number = function (num) {
                    return convert(num, true);
                };
                return EnglishNumberToWordsConverter;
            })(NumberToWords.GenderlessNumberToWordsConverter);
            NumberToWords.EnglishNumberToWordsConverter = EnglishNumberToWordsConverter;
        })(NumberToWords = Localisation.NumberToWords || (Localisation.NumberToWords = {}));
    })(Localisation = Humanizer.Localisation || (Humanizer.Localisation = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=EnglishNumberToWordsConverter.js.map