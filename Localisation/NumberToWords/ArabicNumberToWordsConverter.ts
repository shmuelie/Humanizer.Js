/// <reference path="GenderedNumberToWordsConverter.ts" />

module Humanizer.Localisation.NumberToWords
{
    var arabicGroup: string[] = ["مئة", "ألف", "مليون", "مليار", "تريليون", "كوادريليون", "كوينتليون", "سكستيليون"];
    var arabicAppendedGroup: string[] = ["", "ألفاً", "مليوناً", "ملياراً", "تريليوناً", "كوادريليوناً", "كوينتليوناً", "سكستيليوناً"];
    var arabicPluralGroups: string[] = ["", "آلاف", "ملايين", "مليارات", "تريليونات", "كوادريليونات", "كوينتليونات", "سكستيليونات"];
    var onesGroup: string[] = ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة", "عشرة", "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر"];
    var tensGroup: string[] = ["", "عشرة", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"];
    var hundredsGroup: string[] = ["", "مئة", "مئتان", "ثلاث مئة", "أربع مئة", "خمس مئة", "ست مئة", "سبع مئة", "ثمان مئة", "تسع مئة"];
    var arabicAppendedTwos: string[] = ["مئتان", "ألفان", "مليونان", "ملياران", "تريليونان", "كوادريليونان", "كوينتليونان", "سكستيليونلن"];
    var arabicTwos: string[] = ["مئتان", "ألفان", "مليونان", "ملياران", "تريليونان", "كوادريليونان", "كوينتليونان", "سكستيليونان"];

    export class ArabicNumberToWordsConverter extends GenderedNumberToWordsConverter
    {
        convert_number(num: number): string
        {
            if (num === 0)
            {
                return "صفر";
            }

            var result: string = "";
            var groupLevel: number = 0;

            while (num >= 1)
            {
                var groupNumber: number = num % 1000;
                num = Math.floor(num / 1000);

                var tens: number = groupNumber % 100;
                var hundreds: number = Math.floor(groupNumber / 100);
                var process: string = "";

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
                        if ((tens === 2) && (hundreds === 0) && (groupLevel > 0))
                        {
                            if ((num === 2000) || (num === 2000000) || (num === 2000000000))
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
                        var ones: number = tens % 10;
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

                        if (groupNumber !== 2)
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

        convertToOrdinal_number(num: number): string
        {
            throw new Error("Not Implemented");
        }
    }
}