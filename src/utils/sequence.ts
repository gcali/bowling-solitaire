export interface KeyedElement<T> {
    id: number;
    element: T;
}
export const keyUp = <T>(es: T[]): Array<KeyedElement<T>> => es.map((e, i) => ({ id: i, element: e }));
