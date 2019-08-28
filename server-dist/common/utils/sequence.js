"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyUp = (es) => es.map((e, i) => ({ id: i, element: e }));
exports.permutations = (source) => {
    let result = [];
    for (let i = 0; i < source.length; i++) {
        result = result
            .concat(exports.permutations(source.slice(0, i).concat(source.slice(i + 1))))
            .map((l) => [source[i]].concat(l));
    }
    return result;
};
exports.allSubsets = (source) => {
    if (source.length === 0) {
        return [[]];
    }
    const firstElement = source[0];
    const otherElements = source.slice(1);
    const recursiveSubsets = exports.allSubsets(otherElements);
    return [...recursiveSubsets].concat(recursiveSubsets.map((e) => [firstElement, ...e]));
};
//# sourceMappingURL=sequence.js.map