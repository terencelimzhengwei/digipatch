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
    {
        name: 'Digimon Color Ver. 2',
        id: 'dmc2',
        identifierFunction: dataView => {
            return dataView.getUint32(0x7366, true) === 0x8e11f060;
        },
        regions: [
            {
                startOffset: 0,
                endOffset: 0x7ffff,
                hash: new Uint8Array([
                    0x3d, 0x5a, 0xf6, 0xdd, 0x93, 0xec, 0x0d, 0x13, 0xea, 0xc6,
                    0x8d, 0x11, 0x14, 0x5c, 0x7e, 0xec, 0x02, 0x66, 0x64, 0xe1,
                    0x1f, 0x9d, 0xf4, 0xb8, 0x1f, 0x2c, 0xac, 0x50, 0xe9, 0xce,
                    0xf3, 0xde,
                ]),
            },
            {
                startOffset: 0x80000,
                endOffset: 0x7fcfff,
                hash: new Uint8Array([
                    0x35, 0x3d, 0x0f, 0xda, 0x2c, 0xbe, 0xd9, 0x92, 0x5d, 0xca,
                    0xd0, 0xc5, 0x07, 0x00, 0x2b, 0xa6, 0xab, 0x66, 0xa1, 0x22,
                    0x61, 0x9b, 0xbd, 0xf2, 0x76, 0xf8, 0x85, 0x55, 0xd7, 0xe6,
                    0x31, 0x0f,
                ]),
            },
            {
                startOffset: 0x7ff000,
                endOffset: 0x7fffff,
                hash: new Uint8Array([
                    0x51, 0x51, 0x8f, 0x6e, 0xbf, 0xc2, 0x6d, 0xfe, 0x1a, 0x22,
                    0xda, 0xeb, 0x57, 0xc6, 0x5d, 0x42, 0xe1, 0x64, 0xfa, 0x36,
                    0x87, 0x37, 0x6e, 0xa7, 0xa0, 0x36, 0xfe, 0xa0, 0x56, 0x43,
                    0xa7, 0x3e,
                ]),
            },
        ],
    },
    {
        name: 'Digimon Color Ver. 3',
        id: 'dmc3',
        identifierFunction: dataView => {
            return dataView.getUint32(0xabc0, true) === 0x9217f060;
        },
        regions: [
            {
                startOffset: 0,
                endOffset: 0x7ffff,
                hash: new Uint8Array([
                    0x33, 0xb1, 0x11, 0x01, 0x98, 0x67, 0x6a, 0x18, 0x0d, 0x01,
                    0x7f, 0x20, 0x16, 0xf8, 0xd2, 0xe4, 0xb5, 0x26, 0xa1, 0x71,
                    0xde, 0xc4, 0xd4, 0x4f, 0xfd, 0x9c, 0x9b, 0xe7, 0x77, 0xc4,
                    0xe5, 0x4a,
                ]),
            },
            {
                startOffset: 0x80000,
                endOffset: 0x7fcfff,
                hash: new Uint8Array([
                    0x56, 0x5b, 0x63, 0xd7, 0x47, 0x59, 0xce, 0x16, 0x63, 0x57,
                    0x69, 0x28, 0xbf, 0xa5, 0x54, 0x03, 0xd7, 0xcd, 0xef, 0xe4,
                    0xb8, 0xeb, 0xa4, 0x10, 0x9d, 0xd6, 0x39, 0xae, 0x96, 0xaa,
                    0xb8, 0xc5,
                ]),
            },
            {
                startOffset: 0x7ff000,
                endOffset: 0x7fffff,
                hash: new Uint8Array([
                    0x23, 0xa3, 0xee, 0x57, 0xf4, 0x40, 0x1f, 0xe8, 0x9c, 0xaa,
                    0x43, 0x93, 0x2f, 0x26, 0xf5, 0xad, 0x6c, 0xce, 0xf4, 0x4c,
                    0xd7, 0xfb, 0x55, 0x9e, 0x41, 0xb6, 0x6f, 0x64, 0x17, 0xb0,
                    0x0b, 0x66,
                ]),
            },
        ],
    },
    {
        name: 'Digimon Color Ver. 4',
        id: 'dmc4',
        identifierFunction: dataView => {
            return dataView.getUint32(0x9740, true) === 0x9116f060;
        },
        regions: [
            {
                startOffset: 0,
                endOffset: 0x7ffff,
                hash: new Uint8Array([
                    0xc2, 0x4c, 0x74, 0xa5, 0x7f, 0x6d, 0x35, 0xaf, 0xed, 0x04,
                    0x47, 0xd9, 0xf4, 0x50, 0xfd, 0xb3, 0x13, 0xbe, 0x25, 0x38,
                    0xee, 0x26, 0x03, 0x76, 0x8a, 0x2c, 0x3e, 0x6d, 0xb6, 0xa3,
                    0x9e, 0x10,
                ]),
            },
            {
                startOffset: 0x80000,
                endOffset: 0x7fcfff,
                hash: new Uint8Array([
                    0xcd, 0xc5, 0x30, 0x53, 0xe8, 0x36, 0xd6, 0x42, 0x11, 0x96,
                    0x7f, 0xe7, 0x4a, 0x41, 0x99, 0xeb, 0x77, 0xf5, 0x49, 0xab,
                    0xfb, 0x34, 0xc2, 0x2a, 0xef, 0x4a, 0x24, 0x16, 0x76, 0x06,
                    0x27, 0x20,
                ]),
            },
            {
                startOffset: 0x7ff000,
                endOffset: 0x7fffff,
                hash: new Uint8Array([
                    0x2c, 0xc2, 0x9a, 0xea, 0x57, 0xe8, 0x94, 0xa7, 0xfa, 0x97,
                    0x56, 0x7d, 0x24, 0xf1, 0x06, 0xed, 0x53, 0x47, 0xb0, 0x60,
                    0x6f, 0xde, 0x66, 0xbd, 0x0c, 0xc2, 0xcc, 0xba, 0x60, 0xdc,
                    0x79, 0x48,
                ]),
            },
        ],
    },
    {
        name: 'Digimon Color Ver. 5',
        id: 'dmc5',
        identifierFunction: dataView => {
            return dataView.getUint32(0xa0d0, true) === 0x912bf060;
        },
        regions: [
            {
                startOffset: 0,
                endOffset: 0x7ffff,
                hash: new Uint8Array([
                    0x51, 0xa1, 0x95, 0x8c, 0xbb, 0x22, 0x66, 0xf9, 0x04, 0xfb,
                    0x75, 0xb6, 0x57, 0x84, 0xec, 0x1e, 0xa4, 0xb0, 0x37, 0xa7,
                    0x6d, 0xa9, 0xd9, 0x98, 0x6f, 0x5c, 0xc6, 0xbe, 0x47, 0x17,
                    0x53, 0x73,
                ]),
            },
            {
                startOffset: 0x80000,
                endOffset: 0x7fcfff,
                hash: new Uint8Array([
                    0xf0, 0xef, 0xa6, 0xe4, 0xe4, 0xa7, 0xe2, 0x98, 0x62, 0x0f,
                    0x10, 0xb7, 0xe9, 0x88, 0x6c, 0x79, 0x97, 0x56, 0x67, 0xc5,
                    0x5c, 0x9a, 0xce, 0xbd, 0xec, 0x1f, 0xfc, 0x94, 0xb0, 0x69,
                    0xe6, 0x08,
                ]),
            },
            {
                startOffset: 0x7ff000,
                endOffset: 0x7fffff,
                hash: new Uint8Array([
                    0x2b, 0x6b, 0x45, 0x10, 0x92, 0x9b, 0x70, 0xc5, 0x9f, 0x00,
                    0xc2, 0xbc, 0x28, 0x37, 0xda, 0x3f, 0x12, 0xfb, 0x51, 0x2c,
                    0x44, 0x71, 0x9a, 0x10, 0x40, 0x9d, 0xf0, 0xf7, 0x9b, 0x83,
                    0xad, 0xbd,
                ]),
            },
        ],
    },
    {
        name: 'Digimon Pendulum Color 1 Nature Spirits',
        id: 'penc1',
        identifierFunction: dataView => {
            const position = 0x1733e;
            return (
                dataView.getUint16(position, true) === 0x9640 &&
                dataView.getUint16(position + 2, true) === 0xfe00 &&
                dataView.getUint16(position + 4, true) === 0x990c &&
                dataView.getUint16(position + 6, true) === 0x0d08 &&
                dataView.getUint16(position + 8, true) === 0xd6e4
            );
        },
        regions: [
            {
                startOffset: 0,
                endOffset: 0x3fffff,
                hash: new Uint8Array([
                    0xcd, 0x4a, 0x52, 0x88, 0x54, 0x47, 0xe8, 0xd4, 0x8e, 0x38,
                    0xa4, 0x47, 0xb2, 0x6a, 0x3d, 0x08, 0x88, 0xfa, 0x08, 0x81,
                    0x48, 0x62, 0x5a, 0xbe, 0x5c, 0xd0, 0x9d, 0xae, 0x55, 0xb6,
                    0x93, 0xd1,
                ]),
            },
            {
                startOffset: 0x400000,
                endOffset: 0x7fcfff,
                hash: new Uint8Array([
                    0x4f, 0x3e, 0x03, 0x75, 0x5c, 0xbf, 0x00, 0x63, 0x00, 0x69,
                    0x96, 0x56, 0x58, 0x36, 0x52, 0x4e, 0xfb, 0x46, 0xb9, 0x37,
                    0x50, 0xd0, 0xff, 0xda, 0x1b, 0xb0, 0xdd, 0x19, 0x9d, 0x87,
                    0xbe, 0x70,
                ]),
            },
            {
                startOffset: 0x7ff000,
                endOffset: 0x7fffff,
                hash: new Uint8Array([
                    0xe2, 0x4b, 0x41, 0xcc, 0xe4, 0xf7, 0x0c, 0xe6, 0x6d, 0x0f,
                    0xd3, 0xab, 0xe3, 0xff, 0xf5, 0x50, 0x72, 0xad, 0x6a, 0x9c,
                    0x7d, 0x23, 0x65, 0x52, 0x04, 0xf3, 0xbc, 0xa3, 0xd7, 0xe8,
                    0xe4, 0x93,
                ]),
            },
        ],
    },
    {
        name: 'Digimon Pendulum Color 2 Deep Savers',
        id: 'penc2',
        identifierFunction: dataView => {
            const position = 0x172fc;
            return (
                dataView.getUint16(position, true) === 0x9641 &&
                dataView.getUint16(position + 2, true) === 0xfe00 &&
                dataView.getUint16(position + 4, true) === 0x990c &&
                dataView.getUint16(position + 6, true) === 0x0d08 &&
                dataView.getUint16(position + 8, true) === 0xd6e4
            );
        },
        regions: [
            {
                startOffset: 0,
                endOffset: 0x3fffff,
                hash: new Uint8Array([
                    0xcb, 0xd1, 0x72, 0xdf, 0x90, 0x2e, 0x73, 0x07, 0x83, 0xf9,
                    0x88, 0x9d, 0x33, 0x77, 0xcb, 0x6c, 0x6f, 0x5f, 0x30, 0x0f,
                    0x89, 0x97, 0x1e, 0x21, 0x68, 0x30, 0x2f, 0x3f, 0x8d, 0x14,
                    0x76, 0xa2,
                ]),
            },
            {
                startOffset: 0x400000,
                endOffset: 0x7fcfff,
                hash: new Uint8Array([
                    0x37, 0xd2, 0x31, 0xc9, 0xb8, 0x51, 0x8d, 0x6d, 0xa5, 0x5c,
                    0x51, 0xb5, 0x42, 0x78, 0x6f, 0xf1, 0xdb, 0xe8, 0x6a, 0x0b,
                    0x05, 0x94, 0x39, 0x8e, 0x7b, 0xb3, 0x0b, 0x43, 0x59, 0x53,
                    0xa6, 0x2c,
                ]),
            },
            {
                startOffset: 0x7ff000,
                endOffset: 0x7fffff,
                hash: new Uint8Array([
                    0x4a, 0x79, 0x80, 0x86, 0x37, 0x53, 0x46, 0x0d, 0xeb, 0xe7,
                    0x46, 0x98, 0xb9, 0x82, 0xbf, 0xf5, 0xd9, 0x27, 0x92, 0xba,
                    0x12, 0xa8, 0x8a, 0x43, 0xb4, 0xce, 0xb8, 0xf4, 0x3d, 0xe2,
                    0x8a, 0x49,
                ]),
            },
        ],
    },
    {
        name: 'Digimon Pendulum Color 3 Nightmare Soldiers',
        id: 'penc3',
        identifierFunction: dataView => {
            const position = 0x17302;
            return (
                dataView.getUint16(position, true) === 0x9642 &&
                dataView.getUint16(position + 2, true) === 0xfe00 &&
                dataView.getUint16(position + 4, true) === 0x990c &&
                dataView.getUint16(position + 6, true) === 0x0d08 &&
                dataView.getUint16(position + 8, true) === 0xd6e4
            );
        },
        regions: [
            {
                startOffset: 0,
                endOffset: 0x3fffff,
                hash: new Uint8Array([
                    0x85, 0x60, 0xf4, 0x4a, 0x77, 0x8e, 0xb0, 0x72, 0x1a, 0x70,
                    0x15, 0x19, 0xf0, 0xa8, 0x9e, 0xa2, 0x6b, 0x28, 0x77, 0x87,
                    0x75, 0xd8, 0x6d, 0xab, 0x20, 0x2c, 0x80, 0x15, 0x03, 0x31,
                    0x5d, 0x50,
                ]),
            },
            {
                startOffset: 0x400000,
                endOffset: 0x7fcfff,
                hash: new Uint8Array([
                    0xef, 0x1a, 0x03, 0x11, 0xc7, 0xf3, 0x31, 0x2b, 0x45, 0x53,
                    0xec, 0xaf, 0x20, 0xa1, 0xc8, 0xc0, 0x93, 0x4a, 0x2f, 0x2e,
                    0x87, 0x06, 0x07, 0x5d, 0xe4, 0x12, 0x88, 0x06, 0x27, 0x0d,
                    0x55, 0xe3,
                ]),
            },
            {
                startOffset: 0x7ff000,
                endOffset: 0x7fffff,
                hash: new Uint8Array([
                    0x9e, 0xa6, 0xd4, 0x8b, 0x4b, 0x22, 0xb1, 0x0b, 0xd8, 0xbd,
                    0x2b, 0x3c, 0xa4, 0x3a, 0xd9, 0x60, 0x91, 0x76, 0x63, 0x83,
                    0x7b, 0x3e, 0x33, 0x19, 0xea, 0x1e, 0x46, 0x7f, 0x79, 0x2f,
                    0x49, 0xfb,
                ]),
            },
        ],
    },
    {
        name: 'Digimon Pendulum Color 4 Wind Guardians',
        id: 'penc4',
        identifierFunction: dataView => {
            const position = 0x1791c;
            return (
                dataView.getUint16(position, true) === 0x9643 &&
                dataView.getUint16(position + 2, true) === 0xfe00 &&
                dataView.getUint16(position + 4, true) === 0x990c &&
                dataView.getUint16(position + 6, true) === 0x0d08 &&
                dataView.getUint16(position + 8, true) === 0xd6e4
            );
        },
        regions: [
            {
                startOffset: 0,
                endOffset: 0x7ffff,
                hash: new Uint8Array([
                    0xa3, 0x31, 0x8e, 0xfd, 0x3f, 0x70, 0x3c, 0xf7, 0x34, 0x68,
                    0x3a, 0xf7, 0x8d, 0x7f, 0xf3, 0x8a, 0x2d, 0xfa, 0x06, 0x84,
                    0x60, 0x94, 0x45, 0x09, 0xb5, 0x56, 0xb2, 0xb5, 0x62, 0x55,
                    0x34, 0x00,
                ]),
            },
            {
                startOffset: 0x80000,
                endOffset: 0x7fcfff,
                hash: new Uint8Array([
                    0xea, 0x9c, 0x97, 0xe7, 0x05, 0x99, 0xa8, 0xf1, 0x42, 0x80,
                    0x5d, 0xed, 0x44, 0xc8, 0xbc, 0xf2, 0x25, 0xdd, 0x41, 0x62,
                    0x7d, 0x67, 0x00, 0x81, 0x42, 0xdd, 0x82, 0x84, 0xf3, 0x78,
                    0x38, 0x14,
                ]),
            },
            {
                startOffset: 0x7ff000,
                endOffset: 0x7fffff,
                hash: new Uint8Array([
                    0xc1, 0xa5, 0x18, 0xec, 0x64, 0xef, 0x53, 0x3a, 0x61, 0xdd,
                    0xeb, 0xfa, 0x0a, 0xde, 0x27, 0x0c, 0xea, 0x88, 0xd3, 0xb1,
                    0x84, 0x11, 0xf1, 0x6f, 0xe2, 0xc9, 0x9a, 0x05, 0x87, 0x88,
                    0x86, 0xd4,
                ]),
            },
        ],
    },
    {
        name: 'Digimon Pendulum Color 5 Metal Empire',
        id: 'penc5',
        identifierFunction: dataView => {
            const position = 0x17928;
            return (
                dataView.getUint16(position, true) === 0x9644 &&
                dataView.getUint16(position + 2, true) === 0xfe00 &&
                dataView.getUint16(position + 4, true) === 0x990c &&
                dataView.getUint16(position + 6, true) === 0x0d08 &&
                dataView.getUint16(position + 8, true) === 0xd6e4
            );
        },
        regions: [
            {
                startOffset: 0,
                endOffset: 0x7ffff,
                hash: new Uint8Array([
                    0xd1, 0xdd, 0x7a, 0x10, 0xc0, 0x7e, 0xf1, 0xbb, 0x8f, 0x10,
                    0x99, 0xbd, 0xe4, 0x6b, 0x7f, 0xb3, 0xa9, 0xb4, 0xaa, 0x61,
                    0xf5, 0xc2, 0xd8, 0x44, 0x32, 0x90, 0x33, 0xc9, 0x91, 0xfa,
                    0x9f, 0x5d,
                ]),
            },
            {
                startOffset: 0x80000,
                endOffset: 0x7fcfff,
                hash: new Uint8Array([
                    0x4c, 0x91, 0x5c, 0xcf, 0xb1, 0xf8, 0x87, 0x66, 0x77, 0xbe,
                    0x3b, 0x5b, 0x10, 0x0f, 0x1f, 0xbb, 0x45, 0x1a, 0x7a, 0x67,
                    0x25, 0xe4, 0xe9, 0xf9, 0x1c, 0x03, 0xf4, 0x39, 0x04, 0x12,
                    0x62, 0xb6,
                ]),
            },
            {
                startOffset: 0x7ff000,
                endOffset: 0x7fffff,
                hash: new Uint8Array([
                    0xfe, 0x09, 0x7b, 0xa6, 0xa3, 0x24, 0xca, 0x7f, 0x49, 0x96,
                    0x27, 0xf9, 0xda, 0x0d, 0x74, 0xc0, 0x1b, 0x74, 0x97, 0x59,
                    0xe4, 0x62, 0x4e, 0xb1, 0x35, 0x3f, 0x5b, 0x49, 0xce, 0xf7,
                    0x95, 0x40,
                ]),
            },
        ],
    },
    {
        name: 'Digimon Pendulum Color 0 Virus Busters',
        id: 'penc0',
        identifierFunction: dataView => {
            const position = 0x18da8;
            return (
                dataView.getUint16(position, true) === 0x9645 &&
                dataView.getUint16(position + 2, true) === 0xfe00 &&
                dataView.getUint16(position + 4, true) === 0x990c &&
                dataView.getUint16(position + 6, true) === 0x0d08 &&
                dataView.getUint16(position + 8, true) === 0xd6e4
            );
        },
        regions: [
            {
                startOffset: 0,
                endOffset: 0x7ffff,
                hash: new Uint8Array([
                    0x98, 0x7e, 0x8e, 0x5a, 0xc3, 0xdf, 0x21, 0x51, 0xbf, 0xe4,
                    0x69, 0x02, 0xe4, 0x5c, 0x2a, 0xac, 0x67, 0xed, 0xaf, 0xb4,
                    0x84, 0xa9, 0x02, 0x9e, 0x0e, 0x35, 0x83, 0xdd, 0x79, 0xf1,
                    0x52, 0xa5,
                ]),
            },
            {
                startOffset: 0x80000,
                endOffset: 0x7fcfff,
                hash: new Uint8Array([
                    0xf8, 0x8e, 0xef, 0x24, 0x03, 0x02, 0x82, 0x48, 0xb3, 0xa3,
                    0x2c, 0xdc, 0x26, 0x81, 0x17, 0x6f, 0xeb, 0x7e, 0x88, 0x01,
                    0x78, 0xe4, 0x04, 0x5a, 0x50, 0x9f, 0x7c, 0xe1, 0xfb, 0x23,
                    0x38, 0xc4,
                ]),
            },
            {
                startOffset: 0x7ff000,
                endOffset: 0x7fffff,
                hash: new Uint8Array([
                    0x34, 0x4e, 0x10, 0x3b, 0x9a, 0x25, 0x4f, 0xc0, 0x58, 0x27,
                    0x1f, 0xb5, 0x2d, 0x5f, 0x71, 0x8b, 0x62, 0x32, 0xb2, 0x90,
                    0xac, 0x60, 0x84, 0xce, 0x14, 0xbb, 0x56, 0x79, 0x67, 0xec,
                    0x0f, 0xf4,
                ]),
            },
        ],
    },
];

export default FIRMWARES;
