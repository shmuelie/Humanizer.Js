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

module Humanizer.Bytes
{
    "use strict";

    function isDigit(str: string): boolean
    {
        return (/[0-9]/).test(str.charAt(0));
    }

    export class ByteSize
    {
        static MinValue: ByteSize = new ByteSize(Number.MIN_VALUE);
        static MaxValue: ByteSize = new ByteSize(Number.MAX_VALUE);

        static BitsInByte: number = 8;
        static BytesInKilobyte: number = 1024;
        static BytesInMegabyte: number = 1048576;
        static BytesInGigabyte: number = 1073741824;
        static BytesInTerabyte: number = 1099511627776;

        static BitSymbol: string = "b";
        static ByteSymbol: string = "B";
        static KilobyteSymbol: string = "KB";
        static MegabyteSymbol: string = "MB";
        static GigabyteSymbol: string = "GB";
        static TerabyteSymbol: string = "TB";

        bits: number;
        bytes: number;
        kilobytes: number;
        megabytes: number;
        gigabytes: number;
        terabytes: number;

        largestWholeNumberSymbol(): string
        {
            // Absolute value is used to deal with negative values
            if (Math.abs(this.terabytes) >= 1)
            {
                return ByteSize.TerabyteSymbol;
            }

            if (Math.abs(this.gigabytes) >= 1)
            {
                return ByteSize.GigabyteSymbol;
            }

            if (Math.abs(this.megabytes) >= 1)
            {
                return ByteSize.MegabyteSymbol;
            }

            if (Math.abs(this.kilobytes) >= 1)
            {
                return ByteSize.KilobyteSymbol;
            }

            if (Math.abs(this.bytes) >= 1)
            {
                return ByteSize.ByteSymbol;
            }

            return ByteSize.BitSymbol;
        }

        largestWholeNumberValue(): number
        {
            // Absolute value is used to deal with negative values
            if (Math.abs(this.terabytes) >= 1)
            {
                return this.terabytes;
            }

            if (Math.abs(this.gigabytes) >= 1)
            {
                return this.gigabytes;
            }

            if (Math.abs(this.megabytes) >= 1)
            {
                return this.megabytes;
            }

            if (Math.abs(this.kilobytes) >= 1)
            {
                return this.kilobytes;
            }

            if (Math.abs(this.bytes) >= 1)
            {
                return this.bytes;
            }

            return this.bits;
        }

        constructor(byteSize: number)
        {
            this.bits = Math.ceil(byteSize * ByteSize.BitsInByte);

            this.bytes = byteSize;
            this.kilobytes = byteSize / ByteSize.BytesInKilobyte;
            this.megabytes = byteSize / ByteSize.BytesInMegabyte;
            this.gigabytes = byteSize / ByteSize.BytesInGigabyte;
            this.terabytes = byteSize / ByteSize.BytesInTerabyte;
        }

        static fromBits(value: number): ByteSize
        {
            return new ByteSize(value / ByteSize.BitsInByte);
        }

        static fromBytes(value: number): ByteSize
        {
            return new ByteSize(value);
        }

        static fromKilobytes(value: number): ByteSize
        {
            return new ByteSize(value * ByteSize.BytesInKilobyte);
        }

        static fromMegabytes(value: number): ByteSize
        {
            return new ByteSize(value * ByteSize.BytesInMegabyte);
        }

        static fromGigabytes(value: number): ByteSize
        {
            return new ByteSize(value * ByteSize.BytesInGigabyte);
        }

        static fromTerabyte(value: number): ByteSize
        {
            return new ByteSize(value * ByteSize.BytesInTerabyte);
        }

        toString(): string
        {
            return this.largestWholeNumberValue() + " " + this.largestWholeNumberSymbol();
        }

        toExponential(fractionDigits?: number): string
        {
            return this.largestWholeNumberValue().toExponential(fractionDigits) + " " + this.largestWholeNumberSymbol();
        }

        toFixed(fractionDigits?: number): string
        {
            return this.largestWholeNumberValue().toFixed(fractionDigits) + " " + this.largestWholeNumberSymbol();
        }

        toPercision(percision?: number): string
        {
            return this.largestWholeNumberValue().toPrecision(percision) + " " + this.largestWholeNumberSymbol();
        }

        equals(other: Humanizer.Bytes.ByteSize): boolean
        {
            return this.bits === other.bits;
        }

        compareTo(other: ByteSize): number
        {
            if (this.bits - other.bits < 0)
            {
                return -1;
            }
            if (this.bits - other.bits > 0)
            {
                return 1;
            }
            return 0;
        }

        add(other: ByteSize): ByteSize
        {
            return ByteSize.fromBits(this.bits + other.bits);
        }

        addBits(value: number): ByteSize
        {
            return ByteSize.fromBits(this.bits + value);
        }

        addBytes(value: number): ByteSize
        {
            return ByteSize.fromBytes(this.bytes + value);
        }

        addKilobytes(value: number): ByteSize
        {
            return ByteSize.fromKilobytes(this.kilobytes + value);
        }

        addMegabytes(value: number): ByteSize
        {
            return ByteSize.fromMegabytes(this.megabytes + value);
        }

        addGigabytes(value: number): ByteSize
        {
            return ByteSize.fromGigabytes(this.gigabytes + value);
        }

        addTerabytes(value: number): ByteSize
        {
            return ByteSize.fromTerabyte(this.terabytes + value);
        }

        subtract(other: ByteSize): ByteSize
        {
            return ByteSize.fromBits(this.bits - other.bits);
        }

        per(internval: number): ByteRate
        {
            /// <summary>
            ///     Turns a quantity of bytes in a given interval into a rate that can be manipulated
            /// </summary>
            /// <param name="internval" type="number" integer="true">
            ///     Interval to create rate for
            /// </param>

            return new ByteRate(this, internval);
        }

        static parse(str: string): ByteSize
        {
            if (!str)
            {
                throw new Error("'str' cannot be undefined, null, or empty");
            }

            str = str.trim();
            var num: number;
            var found: boolean = false;
            for (num = 0; num < str.length; num++)
            {
                if (!(isDigit(str.charAt(num)) || (str.charAt(num) === ".")))
                {
                    found = true;
                    break;
                }
            }

            if (found === false)
            {
                return null;
            }

            var lastNumber: number = num;

            var numberPart: string = str.substr(0, lastNumber).trim();
            var sizePart: string = str.substr(lastNumber).trim();

            var $number: number;
            try
            {
                $number = parseFloat(numberPart);
            }
            catch (ex)
            {
                return null;
            }

            switch (sizePart.toUpperCase())
            {
                case ByteSize.ByteSymbol:
                    if (sizePart === ByteSize.BitSymbol)
                    {
                        if ($number % 1 !== 0)
                        {
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
        }
    }
}