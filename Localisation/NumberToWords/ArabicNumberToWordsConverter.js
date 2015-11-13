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
            var arabicGroup = ["مئة", "ألف", "مليون", "مليار", "تريليون", "كوادريليون", "كوينتليون", "سكستيليون"];
            var arabicAppendedGroup = ["", "ألفاً", "مليوناً", "ملياراً", "تريليوناً", "كوادريليوناً", "كوينتليوناً", "سكستيليوناً"];
            var arabicPluralGroups = ["", "آلاف", "ملايين", "مليارات", "تريليونات", "كوادريليونات", "كوينتليونات", "سكستيليونات"];
            var onesGroup = ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة", "عشرة", "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر"];
            var tensGroup = ["", "عشرة", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"];
            var hundredsGroup = ["", "مئة", "مئتان", "ثلاث مئة", "أربع مئة", "خمس مئة", "ست مئة", "سبع مئة", "ثمان مئة", "تسع مئة"];
            var arabicAppendedTwos = ["مئتان", "ألفان", "مليونان", "ملياران", "تريليونان", "كوادريليونان", "كوينتليونان", "سكستيليونلن"];
            var arabicTwos = ["مئتان", "ألفان", "مليونان", "ملياران", "تريليونان", "كوادريليونان", "كوينتليونان", "سكستيليونان"];
            var ArabicNumberToWordsConverter = (function (_super) {
                __extends(ArabicNumberToWordsConverter, _super);
                function ArabicNumberToWordsConverter() {
                    _super.apply(this, arguments);
                }
                ArabicNumberToWordsConverter.prototype.convert_number = function (num) {
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
                            }
                            else {
                                process = hundredsGroup[hundreds];
                            }
                        }
                        if (tens > 0) {
                            if (tens < 20) {
                                if ((tens === 2) && (hundreds === 0) && (groupLevel > 0)) {
                                    if ((num === 2000) || (num === 2000000) || (num === 2000000000)) {
                                        process = arabicAppendedTwos[groupLevel];
                                    }
                                    else {
                                        process = arabicTwos[groupLevel];
                                    }
                                }
                                else {
                                    if (process !== "") {
                                        process += " و ";
                                    }
                                    if ((tens === 1) && (groupLevel > 0) && (hundreds === 0)) {
                                        process += " ";
                                    }
                                    else {
                                        process += onesGroup[tens];
                                    }
                                }
                            }
                            else {
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
                                if (groupNumber !== 2) {
                                    if (groupNumber % 100 !== 1) {
                                        if (groupNumber >= 3) {
                                            result = arabicPluralGroups[groupLevel] + " " + result;
                                        }
                                        else {
                                            result = (result !== "" ? arabicAppendedGroup[groupLevel] : arabicGroup[groupLevel]) + " " + result;
                                        }
                                    }
                                    else {
                                        result = arabicGroup[groupLevel] + " " + result;
                                    }
                                }
                            }
                            result = process + " " + result;
                        }
                        groupLevel++;
                    }
                    return result.trim();
                };
                ArabicNumberToWordsConverter.prototype.convertToOrdinal_number = function (num) {
                    throw new Error("Not Implemented");
                };
                return ArabicNumberToWordsConverter;
            })(NumberToWords.GenderedNumberToWordsConverter);
            NumberToWords.ArabicNumberToWordsConverter = ArabicNumberToWordsConverter;
        })(NumberToWords = Localisation.NumberToWords || (Localisation.NumberToWords = {}));
    })(Localisation = Humanizer.Localisation || (Humanizer.Localisation = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=ArabicNumberToWordsConverter.js.map