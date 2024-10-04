const FIRMWARES = [
    {
        name: 'Digimon Color Ver. 1',
        id: 'dmc1',
        identifierFunction: dataView => {
            return dataView.getUint32(0x9f6a, true) === 0x0344f060;
        },
        regions: [
            {
                startOffset: 0,
                endOffset: 0x7ffff,
                hash: new Uint8Array([
                    0x0b, 0x6d, 0xc0, 0x1a, 0xd2, 0x80, 0x1c, 0x93, 0x84, 0x91,
                    0xd3, 0x16, 0x06, 0x7b, 0x5c, 0xf5, 0xb4, 0x7c, 0x58, 0x64,
                    0xe1, 0xce, 0x81, 0x8b, 0x99, 0x57, 0x09, 0x8f, 0x2a, 0xf8,
                    0xbf, 0x8c,
                ]),
            },
            {
                startOffset: 0x80000,
                endOffset: 0x7fcfff,
                hash: new Uint8Array([
                    0xf3, 0x87, 0xe0, 0x28, 0xcb, 0xed, 0x03, 0xd5, 0xd7, 0xcd,
                    0x1a, 0x77, 0x2e, 0x20, 0x95, 0xcb, 0xf9, 0xce, 0x89, 0x2e,
                    0x67, 0x4e, 0x89, 0xf2, 0x60, 0x9b, 0xd4, 0x42, 0xe4, 0x30,
                    0x87, 0x84,
                ]),
            },
            {
                startOffset: 0x7ff000,
                endOffset: 0x7fffff,
                hash: new Uint8Array([
                    0xf4, 0x9b, 0x86, 0x05, 0x61, 0xe2, 0xee, 0x40, 0x86, 0x1f,
                    0x83, 0x82, 0x4b, 0x29, 0x23, 0x24, 0x60, 0x8e, 0x8f, 0xb0,
                    0x59, 0x73, 0x6d, 0x03, 0x91, 0xdc, 0xdd, 0xab, 0xac, 0x1c,
                    0xa9, 0x65,
                ]),
            },
        ],
    },
];

export default FIRMWARES;
