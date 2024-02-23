import { get } from "radash";
import { Paths } from "type-fest";

/**
 * Create a copy of an array of numbers sorted in descending order (from largest to smallest)
 * @param {number[]} arr
 * @returns {number[]}
 */
export const sortDescending = (arr: number[]): number[] => {
    return arr.toSorted((a, b) => b - a);
};

/**
 * Create a copy of an array of numbers sorted in ascending order (from smallest to largest)
 * @param {number[]} arr
 * @returns {number[]}
 */
export const sortAscending = (arr: number[]): number[] => {
    return arr.toSorted((a, b) => a - b);
};

/**
 * Create a copy of an array of objects sorted in ascending or descending order based on the given key path
 * @template T
 * @param {T[]} arr
 * @param {Paths<T>} key
 * @param {"asc" | "desc"} order - The order to sort the array in: ascending = lowest to highest, descending = highest
 *     to lowest
 * @returns {T[]}
 */
export const sortObjectArray = <T = unknown>(arr: T[], key: Paths<T>, order: "asc" | "desc"): T[] => {
    const sortDirection = order === "asc" ? 1 : -1;

    return arr.toSorted((a, b) => {
        const a_val = +get(a, key.toString(), NaN);
        const b_val = +get(b, key.toString(), NaN);

        return (a_val - b_val) * sortDirection;
    });
};