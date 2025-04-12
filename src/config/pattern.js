const pattern = {
    111111: 0,
    211112: 1,
    121111: 2,
    112111: 3,
    111211: 4,
    112211: 5,
    121211: 6,
    211212: 7,
    212112: 8,
    112221: 9,
    121221: 10,
    212122: 11,
    122221: 12,
    212222: 13,
    222222: 14,
};

const patternToValue = p => pattern[p];
const valueToPattern = v => Object.keys(pattern).find(k => pattern[k] === v);

export { pattern, patternToValue, valueToPattern };
