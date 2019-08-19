export interface KeyedElement<T> {
    id: number;
    element: T;
}
export const keyUp = <T>(es: T[]): Array<KeyedElement<T>> => es.map((e, i) => ({ id: i, element: e }));


export const permutations = <T>(source: T[]): T[][] => {
    let result: T[][] = [];
    for (let i = 0; i < source.length; i++) {
        result = result
            .concat(permutations(source.slice(0, i).concat(source.slice(i + 1))))
            .map((l) => [source[i]].concat(l));
    }
    return result;
};
export const allSubsets = <T>(source: T[]): T[][] => {
    if (source.length === 0) {
        return [[]];
    }
    const firstElement = source[0];
    const otherElements = source.slice(1);
    const recursiveSubsets = allSubsets(otherElements);
    return [...recursiveSubsets].concat(recursiveSubsets.map((e) => [firstElement, ...e]));
};
