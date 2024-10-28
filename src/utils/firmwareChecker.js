import FIRMWARES from '../config/firmware';

const hashData = (data, start, end) => {
    const slice = data.buffer.slice(start, end);
    return crypto.subtle.digest('SHA-256', slice).then(hashBuffer => {
        return new Uint8Array(hashBuffer);
    });
};

const firmwareChecker = async arrayBuffer => {
    try {
        const dataView = new DataView(arrayBuffer);
        const resultsArray = FIRMWARES.map(async firmware => {
            const identifierValid = firmware.identifierFunction(dataView);
            const checks = await Promise.all(
                firmware.regions.map(async region => {
                    const calculatedHash = await hashData(
                        dataView,
                        region.startOffset,
                        region.endOffset + 1
                    );
                    // console.log(
                    //     '0x' + Array.from(calculatedHash, byte =>
                    //         byte.toString(16).padStart(2, '0')
                    //     ).join(',0x')
                    // );
                    // console.log(calculatedHash)
                    const match = calculatedHash.every(
                        (value, index) => value === region.hash[index]
                    );
                    return { ...region, match };
                })
            );
            const regionValid = checks.every(x => x.match);

            return {
                name: firmware.name,
                id: firmware.id,
                identifierValid,
                regionValid,
            };
        });

        const resolvedResults = await Promise.all(resultsArray);
        const validResults = resolvedResults.find(x => x.identifierValid);
        if (!validResults) {
            return null;
        }
        const message = validResults
            ? validResults.regionValid
                ? `Firmware identified as ${validResults.name}`
                : `Firmware identified as ${validResults.name} with some regions invalid`
            : 'Invalid Firmware';
        return { ...validResults, message };
    } catch {
        return null;
    }
};

export default firmwareChecker;
