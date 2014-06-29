var Humanizer;
(function (Humanizer) {
    function toEnglishWords(num) {
        if (num === 0) {
            return "zero";
        }

        if (num < 0) {
            return "minus " + Math.abs(num).toWords();
        }

        var parts = [];

        if ((num / 1000000000) > 0) {
            parts.push(Math.floor(num / 1000000000).toWords() + " billion");
            num %= 1000000000;
        }

        if ((num / 1000000) > 0) {
            parts.push(Math.floor(num / 1000000).toWords() + " million");
            num %= 1000000;
        }

        if ((num / 1000) > 0) {
            parts.push(Math.floor(num / 1000).toWords() + " thousand");
            num %= 1000;
        }

        if ((num / 100) > 0) {
            parts.push(Math.floor(num / 100).toWords() + " hundred");
            num %= 100;
        }

        if (num > 0) {
            if (parts.length !== 0) {
                parts.push("and");
            }

            var unitsMap = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
            var tensMap = ["zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

            if (num < 20) {
                parts.push(unitsMap[num]);
            } else {
                var lastPart = tensMap[Math.floor(num / 10)];
                if ((num % 10) > 0) {
                    lastPart += "-" + unitsMap[num % 10];
                }
                parts.push(lastPart);
            }
        }

        return parts.join(" ");
    }

    function toArabicWords(num) {
        var arabicGroup = ["مئة", "ألف", "مليون", "مليار", "تريليون", "كوادريليون", "كوينتليون", "سكستيليون"];
        var arabicAppendedGroup = ["", "ألفاً", "مليوناً", "ملياراً", "تريليوناً", "كوادريليوناً", "كوينتليوناً", "سكستيليوناً"];
        var arabicPluralGroups = ["", "آلاف", "ملايين", "مليارات", "تريليونات", "كوادريليونات", "كوينتليونات", "سكستيليونات"];
        var onesGroup = ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة", "عشرة", "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر"];
        var tensGroup = ["", "عشرة", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"];
        var hundredsGroup = ["", "مئة", "مئتان", "ثلاث مئة", "أربع مئة", "خمس مئة", "ست مئة", "سبع مئة", "ثمان مئة", "تسع مئة"];
        var arabicAppendedTwos = ["مئتان", "ألفان", "مليونان", "ملياران", "تريليونان", "كوادريليونان", "كوينتليونان", "سكستيليونلن"];
        var arabicTwos = ["مئتان", "ألفان", "مليونان", "ملياران", "تريليونان", "كوادريليونان", "كوينتليونان", "سكستيليونان"];

        if (num === 0) {
            return "صفر";
        }

        var result = "";
        var groupLevel = 0;

        while (num >= 1) {
            var groupNumber = num % 1000;
            num = Math.floor(num / 1000);

            var tens = groupNumber % 100;
            var hundreds = Math.floor(groupNumber / 100);
            var process = "";

            if (hundreds > 0) {
                if ((tens === 0) && (hundreds === 2)) {
                    process = arabicAppendedTwos[0];
                } else {
                    process = hundredsGroup[hundreds];
                }
            }

            if (tens > 0) {
                if (tens < 20) {
                    if ((tens == 2) && (hundreds == 0) && (groupLevel > 0)) {
                        if ((num === 2000) || (num === 2000000) || (num === 2000000000)) {
                            process = arabicAppendedTwos[groupLevel];
                        } else {
                            process = arabicTwos[groupLevel];
                        }
                    } else {
                        if (process !== "") {
                            process += " و ";
                        }

                        if ((tens === 1) && (groupLevel > 0) && (hundreds === 0)) {
                            process += " ";
                        } else {
                            process += onesGroup[tens];
                        }
                    }
                } else {
                    var ones = tens % 10;
                    tens = Math.floor(tens / 10);

                    if (ones > 0) {
                        if (process !== "") {
                            process += " و ";
                        }

                        process += onesGroup[ones];
                    }

                    if (process !== "") {
                        process += " و ";
                    }

                    process += tensGroup[tens];
                }
            }

            if (process !== "") {
                if (groupLevel > 0) {
                    if (result !== "") {
                        result = "و " + result;
                    }

                    if (groupNumber != 2) {
                        if (groupNumber % 100 !== 1) {
                            if (groupNumber >= 3) {
                                result = arabicPluralGroups[groupLevel] + " " + result;
                            } else {
                                result = (result !== "" ? arabicAppendedGroup[groupLevel] : arabicGroup[groupLevel]) + " " + result;
                            }
                        } else {
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

    /**
    * 3501.ToWords() -> "three thousand five hundred and one"
    */
    Number.prototype.toWords = function () {
        /// <summary>
        ///     3501.ToWords() -> "three thousand five hundred and one"
        /// </summary>
        if (navigator.language.indexOf("ar") === 0) {
            return toArabicWords(this);
        }
        return toEnglishWords(this);
    };
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=numberToWordsExntension.js.map
