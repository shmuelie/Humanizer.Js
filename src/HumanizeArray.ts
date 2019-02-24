import { getCollectionFormatter } from './configuration';
import { extender } from './common';

export interface ExtraArray<T> {
    /**
     * Formats the collection for display, calling ToString() on each object and using the default separator for the current culture.
     */
    humanize(): string;
    /**
     * Formats the collection for display, calling `objectFormatter` on each object and using the default separator for the current culture.
     */
    humanize(displayFormatter: (item: T) => string): string;
    /**
     * Formats the collection for display, calling ToString() on each object and using the provided separator.
     */
    humanize(separator: string): string;
    /**
     * Formats the collection for display, calling `objectFormatter` on each object and using the provided separator.
     */
    humanize(displayFormatter: (item: T) => string, separator: string): string;
}

export type ExtendedArray<T> = ExtraArray<T> & Array<T>;

export function humanize<T>($this: T[]): string;
export function humanize<T>($this: T[], displayFormatter: (item: T) => string): string;
export function humanize<T>($this: T[], separator: string): string;
export function humanize<T>($this: T[], displayFormatter: (item: T) => string, separator: string): string;
export function humanize<T>($this: T[], displayFormatterOrSeparator?: ((item: T) => string) | string, separator?: string): string {
    if (separator) {
        return getCollectionFormatter().humanize<T>($this, <(item: T) => string>displayFormatterOrSeparator, separator);
    }
    if (displayFormatterOrSeparator) {
        if (typeof displayFormatterOrSeparator === "string") {
            return getCollectionFormatter().humanize<T>($this, displayFormatterOrSeparator);
        }
        return getCollectionFormatter().humanize<T>($this, displayFormatterOrSeparator);
    }
    return getCollectionFormatter().humanize<T>($this);
}

export function extend(): void;
export function extend<T>($this: T[]): ExtendedArray<T>;
export function extend<T>($this?: T[]): void | ExtendedArray<T> {
    const members = {
        humanize: humanize
    };
    if ($this) {
        extender(members, $this);
        return <ExtendedArray<T>>$this;
    }
    extender(members, Array.prototype);
}