import {
    sortAscending,
    sortDescending,
    sortObjectArray,
} from "libs/core/src/lib/sort";

describe("sortDescending", () => {
    // Returns a sorted array in descending order when given an array of numbers
    it("should return a sorted array in descending order when given an array of numbers", () => {
        const arr = [
            5,
            2,
            8,
            1,
            9,
        ];
        const result = sortDescending(arr);
        expect(result).toEqual([
            9,
            8,
            5,
            2,
            1,
        ]);
    });

    // Returns an empty array when given an empty array
    it("should return an empty array when given an empty array", () => {
        const arr: number[] = [];
        const result = sortDescending(arr);
        expect(result).toEqual([]);
    });

    // Returns an array with a single element when given an array with a single element
    it("should return an array with a single element when given an array with a single element", () => {
        const arr = [ 5 ];
        const result = sortDescending(arr);
        expect(result).toEqual([ 5 ]);
    });

    // Returns the same array when given an array with duplicate elements
    it("should return the same array when given an array with duplicate elements", () => {
        const arr = [
            5,
            2,
            8,
            2,
            9,
        ];
        const result = sortDescending(arr);
        expect(result).toEqual([
            9,
            8,
            5,
            2,
            2,
        ]);
    });

    // Returns a sorted array in descending order when given an array with negative numbers
    it("should return a sorted array in descending order when given an array with negative numbers", () => {
        const arr = [
            -5,
            -2,
            -8,
            -1,
            -9,
        ];
        const result = sortDescending(arr);
        expect(result).toEqual([
            -1,
            -2,
            -5,
            -8,
            -9,
        ]);
    });

    // Returns a sorted array in descending order when given an array with decimal numbers
    it("should return a sorted array in descending order when given an array with decimal numbers", () => {
        const arr = [
            5.5,
            2.3,
            8.7,
            1.1,
            9.9,
        ];
        const result = sortDescending(arr);
        expect(result).toEqual([
            9.9,
            8.7,
            5.5,
            2.3,
            1.1,
        ]);
    });

    // Returns a sorted array in descending order when given an array of numbers
    it("should return a sorted array in ascending order when given an array of numbers", () => {
        const arr = [
            5,
            2,
            8,
            1,
            9,
        ];
        const result = sortAscending(arr);
        expect(result).toEqual([
            1,
            2,
            5,
            8,
            9,
        ]);
    });

    // Returns an empty array when given an empty array
    it("should return an empty array when given an empty array", () => {
        const arr: number[] = [];
        const result = sortAscending(arr);
        expect(result).toEqual([]);
    });

    // Returns an array with a single element when given an array with a single element
    it("should return an array with a single element when given an array with a single element", () => {
        const arr = [ 5 ];
        const result = sortAscending(arr);
        expect(result).toEqual([ 5 ]);
    });

    // Returns the same array when given an array with duplicate elements
    it("should return the same array when given an array with duplicate elements", () => {
        const arr = [
            5,
            2,
            8,
            2,
            9,
        ];
        const result = sortAscending(arr);
        expect(result).toEqual([
            2,
            2,
            5,
            8,
            9,
        ]);
    });

    // Returns a sorted array in descending order when given an array with negative numbers
    it("should return a sorted array in ascending order when given an array with negative numbers", () => {
        const arr = [
            -5,
            -2,
            -8,
            -1,
            -9,
        ];
        const result = sortAscending(arr);
        expect(result).toEqual([
            -9,
            -8,
            -5,
            -2,
            -1,
        ]);
    });

    // Returns a sorted array in descending order when given an array with decimal numbers
    it("should return a sorted array in ascending order when given an array with decimal numbers", () => {
        const arr = [
            5.5,
            2.3,
            8.7,
            1.1,
            9.9,
        ];
        const result = sortAscending(arr);
        expect(result).toEqual([
            1.1,
            2.3,
            5.5,
            8.7,
            9.9,
        ]);
    });

    // sorts an array of objects in ascending order based on a specified key
    it("should sort an array of objects in ascending order based on a specified key", () => {
        const arr = [
            {
                name: "John",
                age:  25,
            },
            {
                name: "Alice",
                age:  30,
            },
            {
                name: "Bob",
                age:  20,
            },
        ];
        const sortedArr = sortObjectArray(arr, "age", "asc");
        expect(sortedArr).toEqual([
            {
                name: "Bob",
                age:  20,
            },
            {
                name: "John",
                age:  25,
            },
            {
                name: "Alice",
                age:  30,
            },
        ]);
    });

    // sorts an array of objects in descending order based on a specified key
    it("should sort an array of objects in descending order based on a specified key", () => {
        const arr = [
            {
                name: "John",
                age:  25,
            },
            {
                name: "Alice",
                age:  30,
            },
            {
                name: "Bob",
                age:  20,
            },
        ];
        const sortedArr = sortObjectArray(arr, "age", "desc");
        expect(sortedArr).toEqual([
            {
                name: "Alice",
                age:  30,
            },
            {
                name: "John",
                age:  25,
            },
            {
                name: "Bob",
                age:  20,
            },
        ]);
    });

    // sorts an array of objects with duplicate keys
    it("should sort an array of objects with duplicate keys", () => {
        const arr = [
            {
                name: "John",
                age:  25,
            },
            {
                name: "Alice",
                age:  30,
            },
            {
                name: "Bob",
                age:  20,
            },
            {
                name: "Eve",
                age:  25,
            },
        ];
        const sortedArr = sortObjectArray(arr, "age", "asc");
        expect(sortedArr).toEqual([
            {
                name: "Bob",
                age:  20,
            },
            {
                name: "John",
                age:  25,
            },
            {
                name: "Eve",
                age:  25,
            },
            {
                name: "Alice",
                age:  30,
            },
        ]);
    });

    // sorts an array of objects with undefined keys
    it("should sort an array of objects with undefined keys", () => {
        const arr = [
            {
                name: "John",
                age:  25,
            },
            {
                name: "Alice",
                age:  30,
            },
            {
                name: "Bob",
                age:  20,
            },
            { name: "Eve" },
        ];
        const sortedArr = sortObjectArray(arr, "age", "asc");
        expect(sortedArr).toEqual([
            {
                name: "Bob",
                age:  20,
            },
            {
                name: "John",
                age:  25,
            },
            {
                name: "Alice",
                age:  30,
            },
            { name: "Eve" },
        ]);
    });
});
