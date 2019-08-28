export interface KeyedElement<T> {
    id: number;
    element: T;
}
export declare const keyUp: <T>(es: T[]) => KeyedElement<T>[];
export declare const permutations: <T>(source: T[]) => T[][];
export declare const allSubsets: <T>(source: T[]) => T[][];
