var Humanizer;
(function (Humanizer) {
    (function (Bytes) {
        "use strict";

        var ByteRate = (function () {
            function ByteRate(size, interval) {
                this.size = size;
                this.interval = interval;
            }
            ByteRate.prototype.humanize = function (timeUnit) {
                if (typeof timeUnit === "undefined") { timeUnit = 1 /* Second */; }
                var displayInterval;
                var displayUnit;

                if (timeUnit === 1 /* Second */) {
                    displayInterval = Number(1).seconds();
                    displayUnit = "s";
                } else if (timeUnit === 2 /* Minute */) {
                    displayInterval = Number(1).minutes();
                    displayUnit = "min";
                } else if (timeUnit === 3 /* Hour */) {
                    displayInterval = Number(1).hours();
                    displayUnit = "hour";
                } else {
                    throw Error("timeUnit must be Second, Minute, or Hour");
                }

                return (new Bytes.ByteSize(this.size.bytes / this.interval.seconds() * displayInterval.seconds())).toString() + "/" + displayUnit;
            };
            return ByteRate;
        })();
        Bytes.ByteRate = ByteRate;
    })(Humanizer.Bytes || (Humanizer.Bytes = {}));
    var Bytes = Humanizer.Bytes;
})(Humanizer || (Humanizer = {}));
//The MIT License (MIT)
var Humanizer;
(function (Humanizer) {
    //Copyright (c) 2013-2014 Omar Khudeira (http://omar.io)
    //Permission is hereby granted, free of charge, to any person obtaining a copy
    //of this software and associated documentation files (the "Software"), to deal
    //in the Software without restriction, including without limitation the rights
    //to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    //copies of the Software, and to permit persons to whom the Software is
    //furnished to do so, subject to the following conditions:
    //The above copyright notice and this permission notice shall be included in
    //all copies or substantial portions of the Software.
    //THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    //IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    //FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    //AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    //LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    //OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    //THE SOFTWARE.
    (function (Bytes) {
        "use strict";

        function isDigit(str) {
            return (/[0-9]/).test(str.charAt(0));
        }

        var ByteSize = (function () {
            function ByteSize(byteSize) {
                this.bits = Math.ceil(byteSize * ByteSize.BitsInByte);

                this.bytes = byteSize;
                this.kilobytes = byteSize / ByteSize.BytesInKilobyte;
                this.megabytes = byteSize / ByteSize.BytesInMegabyte;
                this.gigabytes = byteSize / ByteSize.BytesInGigabyte;
                this.terabytes = byteSize / ByteSize.BytesInTerabyte;
            }
            ByteSize.prototype.largestWholeNumberSymbol = function () {
                // Absolute value is used to deal with negative values
                if (Math.abs(this.terabytes) >= 1) {
                    return ByteSize.TerabyteSymbol;
                }

                if (Math.abs(this.gigabytes) >= 1) {
                    return ByteSize.GigabyteSymbol;
                }

                if (Math.abs(this.megabytes) >= 1) {
                    return ByteSize.MegabyteSymbol;
                }

                if (Math.abs(this.kilobytes) >= 1) {
                    return ByteSize.KilobyteSymbol;
                }

                if (Math.abs(this.bytes) >= 1) {
                    return ByteSize.ByteSymbol;
                }

                return ByteSize.BitSymbol;
            };

            ByteSize.prototype.largestWholeNumberValue = function () {
                // Absolute value is used to deal with negative values
                if (Math.abs(this.terabytes) >= 1) {
                    return this.terabytes;
                }

                if (Math.abs(this.gigabytes) >= 1) {
                    return this.gigabytes;
                }

                if (Math.abs(this.megabytes) >= 1) {
                    return this.megabytes;
                }

                if (Math.abs(this.kilobytes) >= 1) {
                    return this.kilobytes;
                }

                if (Math.abs(this.bytes) >= 1) {
                    return this.bytes;
                }

                return this.bits;
            };

            ByteSize.fromBits = function (value) {
                return new ByteSize(value / ByteSize.BitsInByte);
            };

            ByteSize.fromBytes = function (value) {
                return new ByteSize(value);
            };

            ByteSize.fromKilobytes = function (value) {
                return new ByteSize(value * ByteSize.BytesInKilobyte);
            };

            ByteSize.fromMegabytes = function (value) {
                return new ByteSize(value * ByteSize.BytesInMegabyte);
            };

            ByteSize.fromGigabytes = function (value) {
                return new ByteSize(value * ByteSize.BytesInGigabyte);
            };

            ByteSize.fromTerabyte = function (value) {
                return new ByteSize(value * ByteSize.BytesInTerabyte);
            };

            ByteSize.prototype.toString = function () {
                return this.largestWholeNumberValue() + " " + this.largestWholeNumberSymbol();
            };

            ByteSize.prototype.toExponential = function (fractionDigits) {
                return this.largestWholeNumberValue().toExponential(fractionDigits) + " " + this.largestWholeNumberSymbol();
            };

            ByteSize.prototype.toFixed = function (fractionDigits) {
                return this.largestWholeNumberValue().toFixed(fractionDigits) + " " + this.largestWholeNumberSymbol();
            };

            ByteSize.prototype.toPercision = function (percision) {
                return this.largestWholeNumberValue().toPrecision(percision) + " " + this.largestWholeNumberSymbol();
            };

            ByteSize.prototype.equals = function (other) {
                return this.bits === other.bits;
            };

            ByteSize.prototype.compareT = function (other) {
                if (this.bits - other.bits < 0) {
                    return -1;
                }
                if (this.bits - other.bits > 0) {
                    return 1;
                }
                return 0;
            };

            ByteSize.prototype.add = function (other) {
                return ByteSize.fromBits(this.bits + other.bits);
            };

            ByteSize.prototype.addBits = function (value) {
                return ByteSize.fromBits(this.bits + value);
            };

            ByteSize.prototype.addBytes = function (value) {
                return ByteSize.fromBytes(this.bytes + value);
            };

            ByteSize.prototype.addKilobytes = function (value) {
                return ByteSize.fromKilobytes(this.kilobytes + value);
            };

            ByteSize.prototype.addMegabytes = function (value) {
                return ByteSize.fromMegabytes(this.megabytes + value);
            };

            ByteSize.prototype.addGigabytes = function (value) {
                return ByteSize.fromGigabytes(this.gigabytes + value);
            };

            ByteSize.prototype.addTerabytes = function (value) {
                return ByteSize.fromTerabyte(this.terabytes + value);
            };

            ByteSize.prototype.subtract = function (other) {
                return ByteSize.fromBits(this.bits - other.bits);
            };

            ByteSize.prototype.per = function (internval) {
                /// <summary>
                ///     Turns a quantity of bytes in a given interval into a rate that can be manipulated
                /// </summary>
                /// <param name="internval" type="number" integer="true">
                ///     Interval to create rate for
                /// </param>
                return new Humanizer.Bytes.ByteRate(this, internval);
            };

            ByteSize.parse = function (str) {
                if (!str) {
                    throw new Error("'str' cannot be undefined, null, or empty");
                }

                str = str.trim();
                var num;
                var found = false;
                for (num = 0; num < str.length; num++) {
                    if (!(isDigit(str.charAt(num)) || (str.charAt(num) === "."))) {
                        found = true;
                        break;
                    }
                }

                if (found === false) {
                    return null;
                }

                var lastNumber = num;

                var numberPart = str.substr(0, lastNumber).trim();
                var sizePart = str.substr(lastNumber).trim();

                var $number;
                try  {
                    $number = parseFloat(numberPart);
                } catch (ex) {
                    return null;
                }

                switch (sizePart.toUpperCase()) {
                    case ByteSize.ByteSymbol:
                        if (sizePart === ByteSize.BitSymbol) {
                            if ($number % 1 !== 0) {
                                return null;
                            }
                            return ByteSize.fromBits($number);
                        }
                        return ByteSize.fromBytes($number);
                    case ByteSize.KilobyteSymbol:
                        return ByteSize.fromKilobytes($number);
                    case ByteSize.MegabyteSymbol:
                        return ByteSize.fromMegabytes($number);
                    case ByteSize.GigabyteSymbol:
                        return ByteSize.fromGigabytes($number);
                    case ByteSize.TerabyteSymbol:
                        return ByteSize.fromTerabyte($number);
                }
                return null;
            };
            ByteSize.MinValue = new ByteSize(Number.MIN_VALUE);
            ByteSize.MaxValue = new ByteSize(Number.MAX_VALUE);

            ByteSize.BitsInByte = 8;
            ByteSize.BytesInKilobyte = 1024;
            ByteSize.BytesInMegabyte = 1048576;
            ByteSize.BytesInGigabyte = 1073741824;
            ByteSize.BytesInTerabyte = 1099511627776;

            ByteSize.BitSymbol = "b";
            ByteSize.ByteSymbol = "B";
            ByteSize.KilobyteSymbol = "KB";
            ByteSize.MegabyteSymbol = "MB";
            ByteSize.GigabyteSymbol = "GB";
            ByteSize.TerabyteSymbol = "TB";
            return ByteSize;
        })();
        Bytes.ByteSize = ByteSize;
    })(Humanizer.Bytes || (Humanizer.Bytes = {}));
    var Bytes = Humanizer.Bytes;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    /**
    * Considers input as bits
    */
    Number.prototype.bits = function () {
        /// <summary>
        ///     Considers input as bits
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromBits(this);
    };

    /**
    * Considers input as bytes
    */
    Number.prototype.bytes = function () {
        /// <summary>
        ///     Considers input as bytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromBytes(this);
    };

    /**
    * Considers input as kilobytes
    */
    Number.prototype.kilobytes = function () {
        /// <summary>
        ///     Considers input as kilobytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromKilobytes(this);
    };

    /**
    * Considers input as megabytes
    */
    Number.prototype.megabytes = function () {
        /// <summary>
        ///     Considers input as megabytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromMegabytes(this);
    };

    /**
    * Considers input as gigabytes
    */
    Number.prototype.gigabytes = function () {
        /// <summary>
        ///     Considers input as gigabytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromGigabytes(this);
    };

    /**
    * Considers input as terabytes
    */
    Number.prototype.terabytes = function () {
        /// <summary>
        ///     Considers input as terabytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromTerabyte(this);
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    /**
    * Changes the casing of the provided input
    */
    String.prototype.applyCasing = function (casing) {
        switch (casing) {
            case 0 /* Title */:
                return this.transform(Humanizer.To.TitleCase);
            case 2 /* LowerCase */:
                return this.transform(Humanizer.To.LowerCase);
            case 1 /* AllCaps */:
                return this.transform(Humanizer.To.UpperCase);
            case 3 /* Sentence */:
                return this.transform(Humanizer.To.SentenceCase);
            default:
                throw new Error();
        }
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    var someTime = {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {}
    };

    var MILLIS_PER_SECOND = 1000;
    var MILLIS_PER_MINUTE = MILLIS_PER_SECOND * 60;
    var MILLIS_PER_HOUR = MILLIS_PER_MINUTE * 60;
    var MILLIS_PER_DAY = MILLIS_PER_HOUR * 24;
    var MILLIS_PER_WEEK = MILLIS_PER_DAY * 7;

    for (var i = 1; i <= 10; i++) {
        var plural = i > 1 ? "s" : "";
        var second = "second" + plural;
        var minute = "minute" + plural;
        var hour = "hour" + plural;
        var day = "day" + plural;
        var week = "week" + plural;
        var month = "month" + plural;
        var year = "year" + plural;

        someTime[i][second] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_SECOND);
            };
            return fn;
        }(i));
        someTime[i][second + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_SECOND);
            };
            return fn;
        }(i));
        someTime[i][minute] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_MINUTE);
            };
            return fn;
        }(i));
        someTime[i][minute + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_MINUTE);
            };
            return fn;
        }(i));
        someTime[i][hour] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_HOUR);
            };
            return fn;
        }(i));
        someTime[i][hour + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_HOUR);
            };
            return fn;
        }(i));
        someTime[i][day] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_DAY);
            };
            return fn;
        }(i));
        someTime[i][day + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_DAY);
            };
            return fn;
        }(i));
        someTime[i][week] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_WEEK);
            };
            return fn;
        }(i));
        someTime[i][week + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_WEEK);
            };
            return fn;
        }(i));
        someTime[i][month] = (function (j) {
            var fn = function () {
                var now = new Date();
                now.setMonth(now.getMonth() + j);
                return now;
            };
            return fn;
        }(i));
        someTime[i][month + "From"] = (function (j) {
            var fn = function (date) {
                var newDate = new Date(date.getTime());
                newDate.setMonth(date.getMonth() + j);
                return newDate;
            };
            return fn;
        }(i));
        someTime[i][year] = (function (j) {
            var fn = function () {
                var now = new Date();
                now.setFullYear(now.getFullYear() + j);
                return now;
            };
            return fn;
        }(i));
        someTime[i][year + "From"] = (function (j) {
            var fn = function (date) {
                var newDate = new Date(date.getTime());
                newDate.setFullYear(newDate.getFullYear() + j);
                return newDate;
            };
            return fn;
        }(i));
    }

    var In = (function () {
        function In() {
        }
        In.theYear = function (year) {
            return new Date(year, 0, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of January of the current year
        */
        In.january = function () {
            /// <summary>
            ///     Returns the 1st of January of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 0, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of February of the current year
        */
        In.february = function () {
            /// <summary>
            ///     Returns the 1st of February of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 1, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of March of the current year
        */
        In.march = function () {
            /// <summary>
            ///     Returns the 1st of March of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 2, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of April of the current year
        */
        In.april = function () {
            /// <summary>
            ///     Returns the 1st of April of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 3, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of May of the current year
        */
        In.may = function () {
            /// <summary>
            ///     Returns the 1st of May of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 4, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of June of the current year
        */
        In.june = function () {
            /// <summary>
            ///     Returns the 1st of June of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 5, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of July of the current year
        */
        In.july = function () {
            /// <summary>
            ///     Returns the 1st of July of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 6, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of August of the current year
        */
        In.august = function () {
            /// <summary>
            ///     Returns the 1st of August of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 7, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of September of the current year
        */
        In.september = function () {
            /// <summary>
            ///     Returns the 1st of September of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 8, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of October of the current year
        */
        In.october = function () {
            /// <summary>
            ///     Returns the 1st of October of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 9, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of November of the current year
        */
        In.november = function () {
            /// <summary>
            ///     Returns the 1st of November of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 10, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of December of the current year
        */
        In.december = function () {
            /// <summary>
            ///     Returns the 1st of December of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 11, 1, 0, 0, 0, 0);
        };
        In.one = someTime[1];
        In.two = someTime[2];
        In.three = someTime[3];
        In.four = someTime[4];
        In.five = someTime[5];
        In.six = someTime[6];
        In.seven = someTime[7];
        In.eight = someTime[8];
        In.nine = someTime[9];
        In.ten = someTime[10];
        return In;
    })();
    Humanizer.In = In;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    Date.prototype.at = function (hour, min, second, millisecond) {
        if (typeof min === "undefined") { min = 0; }
        if (typeof second === "undefined") { second = 0; }
        if (typeof millisecond === "undefined") { millisecond = 0; }
        return new Date(this.getFullYear(), this.getMonth(), this.getDate(), hour, min, second, millisecond);
    };

    /**
    * Returns a new instance of DateTime based on the provided date where the time is set to midnight
    */
    Date.prototype.atMidnight = function () {
        /// <summary>
        ///     Returns a new instance of DateTime based on the provided date where the time is set to midnight
        /// </summary>
        return this.at(0);
    };

    /**
    * Returns a new instance of DateTime based on the provided date where the time is set to noon
    */
    Date.prototype.atNoon = function () {
        /// <summary>
        ///     Returns a new instance of DateTime based on the provided date where the time is set to noon
        /// </summary>
        return this.at(12);
    };

    /**
    * Returns a new instance of DateTime based on the provided date where the year is set to the provided year
    */
    Date.prototype.in = function (year) {
        /// <summary>
        ///     Returns a new instance of DateTime based on the provided date where the year is set to the provided year
        /// </summary>
        return new Date(year, this.getMonth(), this.getDate(), this.getHours(), this.getSeconds(), this.getMilliseconds());
    };
})(Humanizer || (Humanizer = {}));
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
        if (typeof plurality === "undefined") { plurality = 0 /* Singular */; }
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
        if (typeof plurality === "undefined") { plurality = 1 /* Plural */; }
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
var Humanizer;
(function (Humanizer) {
    /**
    * @enum
    * @readonly
    */
    (function (LetterCasing) {
        /** SomeString -> Some String */
        LetterCasing[LetterCasing["Title"] = 0] = "Title";

        /** SomeString -> SOME STRING */
        LetterCasing[LetterCasing["AllCaps"] = 1] = "AllCaps";

        /** SomeString -> some string */
        LetterCasing[LetterCasing["LowerCase"] = 2] = "LowerCase";

        /** SomeString -> Some string */
        LetterCasing[LetterCasing["Sentence"] = 3] = "Sentence";
    })(Humanizer.LetterCasing || (Humanizer.LetterCasing = {}));
    var LetterCasing = Humanizer.LetterCasing;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        /**
        * Units of time.
        * @enum
        * @readonly
        */
        (function (TimeUnit) {
            TimeUnit[TimeUnit["Millisecond"] = 0] = "Millisecond";
            TimeUnit[TimeUnit["Second"] = 1] = "Second";
            TimeUnit[TimeUnit["Minute"] = 2] = "Minute";
            TimeUnit[TimeUnit["Hour"] = 3] = "Hour";
            TimeUnit[TimeUnit["Day"] = 4] = "Day";
            TimeUnit[TimeUnit["Week"] = 5] = "Week";
            TimeUnit[TimeUnit["Month"] = 6] = "Month";
            TimeUnit[TimeUnit["Year"] = 7] = "Year";
        })(Localisation.TimeUnit || (Localisation.TimeUnit = {}));
        var TimeUnit = Localisation.TimeUnit;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    function exceptionNumberToWords(num) {
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
        if (exceptions.hasOwnProperty(num.toString())) {
            return exceptions[num];
        }
        return null;
    }

    function removeOnePrefix(towords) {
        if (towords.indexOf("one") === 0) {
            towords = towords.substr(4);
        }
        return towords;
    }

    function normalNumberToWords(num) {
        var towords = num.toWords().replace("-", " ");

        towords = removeOnePrefix(towords);

        if (towords.lastIndexOf("y") === towords.length - 1) {
            towords = towords.substr(0, towords.length - 1) + "ie";
        }

        return towords + "th";
    }

    /**
    * 1.ToOrdinalWords() -> "first"
    */
    Number.prototype.toOrdinalWords = function () {
        /// <summary>
        ///     1.ToOrdinalWords() -> "first"
        /// </summary>
        var towords;

        var ex = exceptionNumberToWords(this);
        if (ex !== null) {
            return ex;
        }

        if (this > 20) {
            var exceptionPart = exceptionNumberToWords(this % 10);
            if (exceptionPart !== null) {
                var normalPart = this - this % 10;
                towords = removeOnePrefix(normalPart.toWords());
                return towords + " " + exceptionPart;
            }
        }

        return normalNumberToWords(this);
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    var MILLIS_PER_SECOND = 1000;
    var MILLIS_PER_MINUTE = MILLIS_PER_SECOND * 60;
    var MILLIS_PER_HOUR = MILLIS_PER_MINUTE * 60;
    var MILLIS_PER_DAY = MILLIS_PER_HOUR * 24;

    Number.prototype.days = function () {
        return this * MILLIS_PER_DAY;
    };

    Number.prototype.weeks = function () {
        return (this * 7).days();
    };

    Number.prototype.hours = function () {
        return this * MILLIS_PER_HOUR;
    };

    Number.prototype.minutes = function () {
        return this * MILLIS_PER_MINUTE;
    };

    Number.prototype.seconds = function () {
        return this * MILLIS_PER_SECOND;
    };

    Number.prototype.milliseconds = function () {
        return this;
    };
})(Humanizer || (Humanizer = {}));
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
var Humanizer;
(function (Humanizer) {
    /**
    * Dictating what should be done when a match is not found - currently used only for DehumanizeTo
    * @readononly
    * @enum
    */
    (function (OnNoMatch) {
        //** This is the default behavior which throws a NoMatchFoundException */
        OnNoMatch[OnNoMatch["ThrowsException"] = 0] = "ThrowsException";

        /** If set to ReturnsNull the method returns null instead of throwing an exception */
        OnNoMatch[OnNoMatch["ReturnsNull"] = 1] = "ReturnsNull";
    })(Humanizer.OnNoMatch || (Humanizer.OnNoMatch = {}));
    var OnNoMatch = Humanizer.OnNoMatch;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    function ordinalize(num, numberString) {
        var nMod100 = num % 100;

        if (nMod100 >= 11 && nMod100 <= 13) {
            return numberString + "th";
        }

        switch (num % 10) {
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

    //** Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th. */
    String.prototype.ordinalize = function () {
        /// <summary>
        ///     Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th.
        /// </summary>
        return ordinalize(Number(this), this);
    };

    /** Turns a number into an ordinal number used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th. */
    Number.prototype.ordinalize = function () {
        /// <summary>
        ///     Turns a number into an ordinal number used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th.
        /// </summary>
        return ordinalize(this, this.toString());
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    var numberOfRomanNumeralMaps = 13;
    var romanNumberals = {
        "M": 1000,
        "CM": 900,
        "D": 500,
        "CD": 400,
        "C": 100,
        "XC": 90,
        "L": 50,
        "XL": 40,
        "X": 10,
        "IX": 9,
        "V": 5,
        "IV": 4,
        "I": 1
    };

    var validRomanNumerals = /^(?:(?=[MDCLXVI])((M{0,3})((C[DM])|(D?C{0,3}))?((X[LC])|(L?XX{0,2})|L)?((I[VX])|(V?(II{0,2}))|V)?))$/;

    /**
    * Converts Roman numbers into integer
    * @returns {Number} Human-readable number
    */
    String.prototype.fromRoman = function () {
        /// <summary>
        ///     Converts Roman numbers into integer
        /// </summary>
        /// <returns type="Number" integer="true">
        ///     Human-readable number
        /// </returns>
        var input = this.toUpperCase().trim();
        var length = input.length;

        if ((length === 0) || !validRomanNumerals.test(input)) {
            throw new Error("Empty or invalid Roman numeral string.");
        }

        var total = 0;
        var i = length;

        while (i > 0) {
            var digit = romanNumberals[input.charAt(--i)];

            if (i > 0) {
                var previousDigit = romanNumberals[input.charAt(i - 1)];

                if (previousDigit < digit) {
                    digit -= previousDigit;
                    i--;
                }
            }
            total += digit;
        }

        return total;
    };

    /**
    * Converts the input to Roman number
    * @returns {String} Roman number
    */
    Number.prototype.toRoman = function () {
        /// <summary>
        ///     Converts the input to Roman number
        /// </summary>
        /// <returns type="String">
        ///     Roman number
        /// </returns>
        var minValue = 1;
        var maxValue = 3999;
        var mazRomanNumeralLength = 15;

        if ((this < minValue) || (this > maxValue)) {
            throw new Error("Out of range");
        }

        var sb = [];
        var input = this;

        for (var key in romanNumberals) {
            var value = romanNumberals[key];
            while (input / value > 0) {
                sb.push(key);
                input -= value;
            }
        }

        return sb.join("");
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    /**
    * Dehumanizes a string; e.g. 'some string', 'Some String', 'Some string' -> 'SomeString'
    */
    String.prototype.dehumanize = function () {
        /// <summary>
        ///     Dehumanizes a string; e.g. 'some string', 'Some String', 'Some string' -> 'SomeString'
        /// </summary>
        var titlizedWords = this.split(" ");
        var length = titlizedWords.length;
        for (var i = 0; i < length; i++) {
            titlizedWords[i] = titlizedWords[i].humanize(0 /* Title */);
        }
        return titlizedWords.join("").replace(" ", "");
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    function fromUnderscoreDashSeparatedWords(input) {
        return input.split(/[_-]/g, Number.MAX_VALUE).join(" ");
    }

    function fromPascalCase(input) {
        var pascalCaseRegex = /(?:([A-Z][a-z]+)(?=[A-Z]))|(?:([a-z]+)(?=[A-Z]))|(?:(\d+))|(?:([A-Z][a-z]+))|([A-Z]+)/g;
        var matches = input.match(pascalCaseRegex) || [];
        var matchesLength = matches.length;
        for (var i = 0; i < matchesLength; i++) {
            var word = matches[i] || "";
            matches[i] = (word.toUpperCase() === word) && (word.length > 1) ? word : word.toLowerCase();
        }
        var result = matches.join(" ");
        result = result.charAt(0).toUpperCase() + result.substr(1);
        return result.replace(" i ", " I ");
    }

    function humanize(input) {
        if (input === input.toUpperCase()) {
            return input;
        }

        if ((input.indexOf("_") !== -1) || (input.indexOf("-") !== -1)) {
            return fromUnderscoreDashSeparatedWords(input);
        }

        return fromPascalCase(input);
    }

    /**
    * Humanizes the input string
    * @param {Humanizer.LetterCasing} [casing] The desired casing for the output
    */
    String.prototype.humanize = function (casing) {
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
        if ((casing !== null) && (casing !== undefined)) {
            return humanize(this).applyCasing(casing);
        } else {
            return humanize(this);
        }
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    /** Transforms a string using the provided transformers. Transformations are applied in the provided order. */
    String.prototype.transform = function () {
        /// <summary>
        ///     Transforms a string using the provided transformers. Transformations are applied in the provided order.
        /// </summary>
        var transformers = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            transformers[_i] = arguments[_i + 0];
        }
        var str = this;
        var length = transformers.length;
        for (var i = 0; i < length; i++) {
            str = transformers[i].transform(str);
        }
        return str;
    };

    var To = (function () {
        function To() {
        }
        To.TitleCase = new Humanizer.ToTitleCase();
        To.UpperCase = new Humanizer.ToUpperCase();
        To.LowerCase = new Humanizer.ToLowerCase();
        To.SentenceCase = new Humanizer.ToSentenceCase();
        return To;
    })();
    Humanizer.To = To;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    var ToLowerCase = (function () {
        function ToLowerCase() {
        }
        ToLowerCase.prototype.transform = function (input) {
            return input.toLocaleLowerCase();
        };
        return ToLowerCase;
    })();
    Humanizer.ToLowerCase = ToLowerCase;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    var ToSentenceCase = (function () {
        function ToSentenceCase() {
        }
        ToSentenceCase.prototype.transform = function (input) {
            if (input.length > 1) {
                return input.charAt(0).toUpperCase() + input.substr(1);
            }
            return input.toUpperCase();
        };
        return ToSentenceCase;
    })();
    Humanizer.ToSentenceCase = ToSentenceCase;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    var ToTitleCase = (function () {
        function ToTitleCase() {
        }
        ToTitleCase.prototype.transform = function (input) {
            var words = input.split(" ");
            var result = [];
            var length = words.length;
            for (var i = 0; i < length; i++) {
                var word = words[i];
                if ((word.length === 0) || (word === word.toUpperCase())) {
                    result.push(word);
                } else if (word.length === 1) {
                    result.push(word.toUpperCase());
                } else {
                    result.push(word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
                }
            }
            return result.join(" ");
        };
        return ToTitleCase;
    })();
    Humanizer.ToTitleCase = ToTitleCase;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    var ToUpperCase = (function () {
        function ToUpperCase() {
        }
        ToUpperCase.prototype.transform = function (input) {
            return input.toUpperCase();
        };
        return ToUpperCase;
    })();
    Humanizer.ToUpperCase = ToUpperCase;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    /**
    * Truncation location for humanizer
    * @enum
    * @readonly
    */
    (function (TruncateFrom) {
        /** Truncate letters from the left (start) of the string */
        TruncateFrom[TruncateFrom["Left"] = 0] = "Left";

        /** Truncate letters from the right (end) of the string */
        TruncateFrom[TruncateFrom["Right"] = 1] = "Right";
    })(Humanizer.TruncateFrom || (Humanizer.TruncateFrom = {}));
    var TruncateFrom = Humanizer.TruncateFrom;

    String.prototype.truncate = function (length, truncator, from) {
        if (typeof truncator === "undefined") { truncator = Humanizer.Truncator.FixedLength; }
        if (typeof from === "undefined") { from = 1 /* Right */; }
        return truncator.truncate(this, length, "…", from);
    };

    String.prototype.truncateWith = function (length, truncationString, truncator, from) {
        if (typeof truncator === "undefined") { truncator = Humanizer.Truncator.FixedLength; }
        if (typeof from === "undefined") { from = 1 /* Right */; }
        return truncator.truncate(this, length, truncationString, from);
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    var FixedLengthTruncator = (function () {
        function FixedLengthTruncator() {
        }
        FixedLengthTruncator.prototype.truncate = function (value, length, truncationString, truncateFrom) {
            if (typeof truncateFrom === "undefined") { truncateFrom = 1 /* Right */; }
            if (!value) {
                return null;
            }

            if (value.length === 0) {
                return value;
            }

            if (truncationString === null || truncationString.length > length) {
                return truncateFrom === 1 /* Right */ ? value.substr(0, length) : value.substr(value.length - length);
            }

            if (truncateFrom === 0 /* Left */) {
                return value.length > length ? truncationString + value.substr(value.length - length + truncationString.length) : value;
            }

            return value.length > length ? value.substr(0, length - truncationString.length) + truncationString : value;
        };
        return FixedLengthTruncator;
    })();
    Humanizer.FixedLengthTruncator = FixedLengthTruncator;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    var charRegex = /[A-Za-z0-9]/;
    var FixedNumberOfCharactersTruncator = (function () {
        function FixedNumberOfCharactersTruncator() {
        }
        FixedNumberOfCharactersTruncator.prototype.truncate = function (value, length, truncationString, truncateFrom) {
            if (typeof truncateFrom === "undefined") { truncateFrom = 1 /* Right */; }
            if (!value) {
                return null;
            }

            if (value.length == 0) {
                return value;
            }

            if (truncationString === null || truncationString.length > length) {
                return truncateFrom === 1 /* Right */ ? value.substr(0, length) : value.substr(value.length - length);
            }

            var alphaNumericalCharatersProcessed = 0;

            if (value.match(charRegex).length <= length) {
                return value;
            }

            var i;
            if (truncateFrom = 0 /* Left */) {
                for (i = value.length - 1; i > 0; i--) {
                    if (charRegex.test(value.charAt(i))) {
                        alphaNumericalCharatersProcessed++;
                    }
                    if (alphaNumericalCharatersProcessed + truncationString.length === length) {
                        return truncationString + value.substr(i);
                    }
                }
            }

            for (i = 0; i < value.length - truncationString.length; i++) {
                if (charRegex.test(value.charAt(i))) {
                    alphaNumericalCharatersProcessed++;
                }
                if (alphaNumericalCharatersProcessed + truncationString.length === length) {
                    return value.substr(0, i + 1) + truncationString;
                }
            }

            return value;
        };
        return FixedNumberOfCharactersTruncator;
    })();
    Humanizer.FixedNumberOfCharactersTruncator = FixedNumberOfCharactersTruncator;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    var whiteSpaceTest = /\s/;
    var empty = /^\s*$/;

    function truncateFromRight(value, length, truncationString) {
        var lastCharactersWasWhiteSpace = true;
        var numberOfWordsProcessed = 0;
        for (var i = 0; i < value.length; i++) {
            if (whiteSpaceTest.test(value.charAt(i))) {
                if (!lastCharactersWasWhiteSpace) {
                    numberOfWordsProcessed++;
                }

                lastCharactersWasWhiteSpace = true;

                if (numberOfWordsProcessed === length) {
                    return value.substr(0, i) + truncationString;
                }
            } else {
                lastCharactersWasWhiteSpace = false;
            }
        }
        return value + truncationString;
    }

    function truncateFromLeft(value, length, truncationString) {
        var lastCharactersWasWhiteSpace = true;
        var numberOfWordsProcessed = 0;
        for (var i = value.length - 1; i > 0; i--) {
            if (whiteSpaceTest.test(value.charAt(i))) {
                if (!lastCharactersWasWhiteSpace) {
                    numberOfWordsProcessed++;
                }

                lastCharactersWasWhiteSpace = true;

                if (numberOfWordsProcessed == length) {
                    return truncationString + value.substr(i + 1).trim();
                }
            } else
                lastCharactersWasWhiteSpace = false;
        }
        return truncationString + value;
    }

    var FixedNumberOfWordsTruncator = (function () {
        function FixedNumberOfWordsTruncator() {
        }
        FixedNumberOfWordsTruncator.prototype.truncate = function (value, length, truncationString, truncateFrom) {
            if (typeof truncateFrom === "undefined") { truncateFrom = 1 /* Right */; }
            if (value === null) {
                return null;
            }

            if (value.length === 0) {
                return value;
            }

            var numberOfWords = 0;
            var words = value.split(whiteSpaceTest);

            for (var i = 0; i < words.length; i++) {
                if (!empty.test(words[i])) {
                    numberOfWords++;
                }
            }

            if (numberOfWords <= length) {
                return value;
            }

            return truncateFrom === 1 /* Right */ ? truncateFromRight(value, length, truncationString) : truncateFromLeft(value, length, truncationString);
        };
        return FixedNumberOfWordsTruncator;
    })();
    Humanizer.FixedNumberOfWordsTruncator = FixedNumberOfWordsTruncator;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    var Truncator = (function () {
        function Truncator() {
        }
        Truncator.FixedLength = new Humanizer.FixedLengthTruncator();
        Truncator.FixedNumberOfCharacters = new Humanizer.FixedNumberOfCharactersTruncator();
        Truncator.FixedNumberOfWords = new Humanizer.FixedNumberOfWordsTruncator();
        return Truncator;
    })();
    Humanizer.Truncator = Truncator;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=humanizer.js.map
