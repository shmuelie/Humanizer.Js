//The MIT License (MIT)
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
var Humanizer;
(function (Humanizer) {
    var Bytes;
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
            ByteSize.prototype.compareTo = function (other) {
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
                return new Bytes.ByteRate(this, internval);
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
                try {
                    $number = parseFloat(numberPart);
                }
                catch (ex) {
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
    })(Bytes = Humanizer.Bytes || (Humanizer.Bytes = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=ByteSize.js.map