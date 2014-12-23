interface Number
{
    bits(): Humanizer.Bytes.ByteSize;
    bytes(): Humanizer.Bytes.ByteSize;
    kilobytes(): Humanizer.Bytes.ByteSize;
    megabytes(): Humanizer.Bytes.ByteSize;
    gigabytes(): Humanizer.Bytes.ByteSize;
    terabytes(): Humanizer.Bytes.ByteSize;
}

module Humanizer
{
    "use strict";

    /**
     * Considers input as bits
     */
    Number.prototype.bits = function (): Humanizer.Bytes.ByteSize
    {
        /// <summary>
        ///     Considers input as bits
        /// </summary>

        return Humanizer.Bytes.ByteSize.fromBits(this);
    };

    /**
     * Considers input as bytes
     */
    Number.prototype.bytes = function (): Humanizer.Bytes.ByteSize
    {
        /// <summary>
        ///     Considers input as bytes
        /// </summary>

        return Humanizer.Bytes.ByteSize.fromBytes(this);
    };

    /**
     * Considers input as kilobytes
     */
    Number.prototype.kilobytes = function (): Humanizer.Bytes.ByteSize
    {
        /// <summary>
        ///     Considers input as kilobytes
        /// </summary>

        return Humanizer.Bytes.ByteSize.fromKilobytes(this);
    };

    /**
     * Considers input as megabytes
     */
    Number.prototype.megabytes = function (): Humanizer.Bytes.ByteSize
    {
        /// <summary>
        ///     Considers input as megabytes
        /// </summary>

        return Humanizer.Bytes.ByteSize.fromMegabytes(this);
    };

    /**
     * Considers input as gigabytes
     */
    Number.prototype.gigabytes = function (): Humanizer.Bytes.ByteSize
    {
        /// <summary>
        ///     Considers input as gigabytes
        /// </summary>

        return Humanizer.Bytes.ByteSize.fromGigabytes(this);
    };

    /**
     * Considers input as terabytes
     */
    Number.prototype.terabytes = function (): Humanizer.Bytes.ByteSize
    {
        /// <summary>
        ///     Considers input as terabytes
        /// </summary>

        return Humanizer.Bytes.ByteSize.fromTerabyte(this);
    };
}