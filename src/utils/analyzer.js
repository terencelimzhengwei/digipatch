import { arrayBufferToImageData } from './imageUtils';
import metadata from '../config/metadata.json';
import firmwareChecker from './firmwareChecker';
import JSZip from 'jszip';
import PATCHES from '../patch/patches';

const getQuestInfos = (arrayBuffer, spriteMetadata) => {
    const { QuestModeLocation, QuestMode } = spriteMetadata;
    const { levels, enemies, attributes } = QuestMode;
    const data = new DataView(arrayBuffer.slice(0));
    const offset = Number(QuestModeLocation);
    const questMode = [];
    for (let i = 0; i < levels; i++) {
        const level = [];
        for (let j = 0; j < enemies; j++) {
            const enemy = {};
            attributes.forEach((a, index) => {
                const offsetValue =
                    offset +
                    i * enemies * attributes.length * 2 +
                    j * attributes.length * 2 +
                    index * 2;
                enemy[a] = data.getUint16(offsetValue, true);
            });
            level.push({ ...enemy });
        }
        questMode.push([...level]);
    }
    return questMode;
};

const getAnimation = (buffer, spriteMetadata) => {
    const { AnimationLocation, AnimationFrames, AnimationFrameInfo } =
        spriteMetadata;
    const data = new DataView(buffer.slice(0));
    const offset = Number(AnimationLocation);
    const animation = [];
    for (let i = 0; i < AnimationFrames; i++) {
        const frame = AnimationFrameInfo.map((label, index) => {
            const obj = {};
            obj[label] = data.getUint16(
                offset + i * AnimationFrameInfo.length * 2 + index * 2,
                true
            );
            return obj;
        });
        const frameObj = Object.assign({}, ...frame);
        animation.push(frameObj);
    }
    return animation;
};

const getDigimonNames = (buffer, spriteMetadata, isPencPlus) => {
    if (!isPencPlus) {
        return [];
    }
    const { DigimonNameLocation, MaxNameLength, NumCharas } = spriteMetadata;
    const data = new DataView(buffer.slice(0));
    const offset = Number(DigimonNameLocation);
    const names = [];
    for (let i = 0; i < NumCharas; i++) {
        let name = '';
        for (let j = 0; j < MaxNameLength; j++) {
            const char = data.getUint16(
                offset + i * 2 * MaxNameLength + j * 2,
                true
            );
            if ((char === 0) | (char === 65535)) {
                continue;
            }
            name += String.fromCharCode(char);
        }
        names.push(name);
    }
    return names;
};

const getCharInfos = (arrayBuffer, spriteMetadata) => {
    const data = new DataView(arrayBuffer.slice(0));
    let offset = Number(spriteMetadata.StatTableLocation);
    const statLength = spriteMetadata.Stats.length;
    let charInfos = [];
    for (let i = 0; i < spriteMetadata.NumCharas; i++) {
        const stats = spriteMetadata.Stats.map((stat, index) => {
            const obj = {};
            obj[stat] = data.getUint16(
                offset + i * statLength * 2 + index * 2,
                true
            );
            return obj;
        });
        const statObj = Object.assign({}, ...stats);
        charInfos.push(statObj);
    }
    return charInfos;
};

const getImageInfos = (arrayBuffer, spriteMetadata) => {
    const data = new DataView(arrayBuffer.slice(0));
    let secondOffset = spriteMetadata?.SizeTableOffsetTwo ?? null;
    let offset = spriteMetadata?.SizeTableOffset ?? null;
    let imageInfos = [];
    if (!secondOffset) {
        // Read size table
        for (let i = 0; i < spriteMetadata.NumImages; i++) {
            imageInfos.push({
                width: data.getUint16(offset, true),
                height: data.getUint16(offset + 2, true),
            });
            offset += 4;
        }
    } else {
        while (true) {
            const width = data.getUint16(secondOffset, true)
            if (width === 0) {
                break
            }
            const height = data.getUint16(secondOffset + 2, true)
            imageInfos.push({width,height})
            secondOffset += 4
        } 

    }
    // Read offsets
    offset = Number(spriteMetadata.SpritePackBase);
    imageInfos.forEach(info => {
        info.dataOffset = data.getInt32(offset, true);
        offset += 4;
    });
    return imageInfos;
};

const getImage = (arrayBuffer, spriteMetadata, info) => {
    const pixels = arrayBuffer.slice(
        Number(spriteMetadata.SpritePackBase) + info.dataOffset,
        Number(spriteMetadata.SpritePackBase) +
            info.dataOffset +
            info.width * info.height * 2
    );
    return arrayBufferToImageData(pixels, info.width, info.height);
};

const getConfig = (arrayBuffer, spriteMetadata) => {
    const data = new DataView(arrayBuffer.slice(0));
    const configOffset = spriteMetadata?.ConfigLocation ?? null
    if (configOffset) {
        const numChars = data.getUint16(configOffset,true);
        const isCycle = data.getUint16(configOffset + 2,true);
        return {numChars,isCycle}
    }
    return null
};

const getNewCharInfos = (arrayBuffer, spriteMetadata) => {
    const data = new DataView(arrayBuffer.slice(0));
    const config = getConfig(arrayBuffer,spriteMetadata)
    if (config) {
        const numChars = config.numChars
        let offset = Number(spriteMetadata?.ConfigLocation + 4);
        const statLength = spriteMetadata.Stats.length;
        let charInfos = [];
        for (let i = 0; i < numChars; i++) {
            const stats = spriteMetadata.Stats.map((stat, index) => {
                const obj = {};
                obj[stat] = data.getUint16(
                    offset + i * statLength * 2 + index * 2,
                    true
                );
                return obj;
            });
            const statObj = Object.assign({}, ...stats);
            charInfos.push(statObj);
        }
        return charInfos;
    }
    return null
};

const getEvolutions = (arrayBuffer, spriteMetadata) => {
    const data = new DataView(arrayBuffer.slice(0));
    const config = getConfig(arrayBuffer,spriteMetadata)
    if (config) {
        const numChars = config.numChars
        const statLength = spriteMetadata.Stats.length;
        const evolutionLength = spriteMetadata.Evolutions.length;
        let offset = Number(spriteMetadata?.ConfigLocation + 4 + numChars * statLength * 2);
        let evolutions = [];
        let i = 0;
        while (true) {
            const baseOffset = offset + i * evolutionLength * 2;

            const evolutionObj = Object.fromEntries(
                spriteMetadata.Evolutions.map((stat, index) => [
                    stat,
                    data.getUint16(baseOffset + index * 2, true)
                ])
            );

            const isEnd = Object.values(evolutionObj).every(val => val === 0);
            if (isEnd) return evolutions;

            evolutions.push(evolutionObj);
            i += 1;
        }
    }
    return null
};

const getImages = (arrayBuffer, spriteMetadata, imageInfos) => {
    const imageDatas = imageInfos.map(info => {
        return getImage(arrayBuffer, spriteMetadata, info);
    });
    return imageDatas;
};

// const downloadAllImages = async spriteUrls => {
//     const zip = new JSZip();
//     const folder = zip.folder('images'); // Create a folder inside the zip

//     // Convert dataURLs to binary and add them to the zip
//     spriteUrls.forEach((dataUrl, index) => {
//         const base64Data = dataUrl.split(',')[1]; // Strip the base64 header
//         const imgFileName = `${index}.png`; // Name for the image file
//         folder.file(imgFileName, base64Data, { base64: true });
//     });

//     // Generate the zip file
//     const content = await zip.generateAsync({ type: 'blob' });
//     // Create a link element and trigger download
//     downloadFile(URL.createObjectURL(content), 'images.zip')
// };

const downloadZip = async (arrayBuffer, spriteUrls) => {
    const zip = new JSZip();
    const folder = zip.folder('images'); // Create a folder inside the zip

    // Convert dataURLs to binary and add them to the zip
    spriteUrls.forEach((dataUrl, index) => {
        const base64Data = dataUrl.split(',')[1]; // Strip the base64 header
        const imgFileName = `${index}.png`; // Name for the image file
        folder.file(imgFileName, base64Data, { base64: true });
    });

    const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
    zip.file('output.bin', blob);

    // Generate the zip file
    const content = await zip.generateAsync({ type: 'blob' });
    // Create a link element and trigger download
    downloadFile(URL.createObjectURL(content), 'patched_bin.zip');
};

const rebuildImages = (view, spriteMetadata, imageInfos, imageDatas, dataView) => {
    const sizeTableOffset = spriteMetadata?.SizeTableOffsetTwo ?? spriteMetadata.SizeTableOffset

    // Update size and offset table and image data
    imageInfos.forEach((img, i) => {
        const newImageView = new Uint8Array(imageDatas[i].rgb565);
        view.set(
            newImageView,
            Number(spriteMetadata.SpritePackBase) + img.dataOffset
        );

        dataView.setUint16(
            sizeTableOffset + i * 4,
            img.width,
            true
        );

        dataView.setUint16(
            sizeTableOffset + i * 4 + 2,
            img.height,
            true
        );

        dataView.setUint32(
            Number(spriteMetadata.SpritePackBase) + i * 4,
            img.dataOffset,
            true
        );
    });
}

const rebuildQuests = (dataView, spriteMetadata, questMode) => {
    // Update quest data
    const questOffset = Number(spriteMetadata.QuestModeLocation);
    questMode.forEach((stage, stageIndex) => {
        stage.forEach((char, charIndex) => {
            Object.entries(char).forEach(
                ([attribute, value], attributeIndex) => {
                    dataView.setUint16(
                        questOffset +
                            (stageIndex * stage.length + charIndex) *
                                Object.keys(char).length *
                                2 +
                            attributeIndex * 2,
                        value,
                        true
                    );
                }
            );
        });
    });
}

const rebuildAnimations = (dataView, spriteMetadata, animation) => {
    const { AnimationLocation, AnimationFrameInfo } = spriteMetadata;
    const offset = Number(AnimationLocation);
    animation.forEach((frame, index) => {
        dataView.setUint16(
            offset + index * AnimationFrameInfo.length * 2,
            frame.spriteId,
            true
        );
        dataView.setUint16(
            offset + index * AnimationFrameInfo.length * 2 + 2,
            frame.x,
            true
        );
        dataView.setUint16(
            offset + index * AnimationFrameInfo.length * 2 + 4,
            frame.y,
            true
        );
        dataView.setUint16(
            offset + index * AnimationFrameInfo.length * 2 + 6,
            frame.flip,
            true
        );
    });
}

const rebuildPatches = (dataView, patchFiles) => {
    if (patchFiles) {
        patchFiles.forEach(file => {
            file.diff.forEach(diff => {
                const { start, original_data, patched_data } = diff;

                const dataToUse = file.enabled ? patched_data : original_data;

                // Convert the hex data string to a Uint8Array
                const byteArray = hexStringToUint8Array(dataToUse);

                // Write each byte into the buffer using the DataView
                byteArray.forEach((byte, i) => {
                    dataView.setUint8(Number(start) + i, byte, true);
                });
            });
        });
    }
}

const rebuildNames = (dataView, firmware, spriteMetadata, names) => {
    const { DigimonNameLocation, MaxNameLength } = spriteMetadata;
    const NameOffset = Number(DigimonNameLocation);

    // Only write names if it's a PenC+ version
    if (firmware.id.includes('+')) {
        names.forEach((name, i) => {
            const charCodes = Array.from(name).map(char => char.charCodeAt(0));
            charCodes.push(0); // add null terminator
            while (charCodes.length < MaxNameLength) {
                charCodes.push(65535);
            }
            charCodes.forEach((c, index) => {
                dataView.setUint16(
                    NameOffset + i * MaxNameLength * 2 + index * 2,
                    c,
                    true
                );
            });
        });
    }
}

const rebuildConfig = (dataView, spriteMetadata, config) => {
    const configLocation = spriteMetadata?.configLocation ?? null
    if (configLocation && config) {
        dataView.setUint16(configLocation, config.numChars, true)
        dataView.setUint16(configLocation, config.isCycle, true)
    }
}

const rebuildCharacters = (dataView, spriteMetadata, config, charInfos) => {
    // Update character stats
    const statOffset = config ?  Number(spriteMetadata?.ConfigLocation + 4) : Number(spriteMetadata.StatTableLocation);
    const statLength = spriteMetadata.Stats.length;
    charInfos.forEach((info, charIndex) => {
        Object.entries(info).forEach(([key, value], statIndex) => {
            dataView.setUint16(
                statOffset + (charIndex * statLength + statIndex) * 2,
                value,
                true
            );
        });
    });
}

const rebuildEvolutions = (dataView, spriteMetadata, config, evolutions) => {
    if (config && evolutions) {
        const zeroedObj = Object.fromEntries(spriteMetadata.Evolutions.map(key => [key, 0]));
        const newEvolutions = [
            ...evolutions,
            zeroedObj
        ]
        const numChars = config.numChars
        const statLength = spriteMetadata.Stats.length;
        const evolutionLength = spriteMetadata.Evolutions.length;
        const offset = Number(spriteMetadata?.ConfigLocation + 4 + numChars * statLength * 2);
        newEvolutions.forEach((info, evolutionIndex) => {
            Object.entries(info).forEach(([key, value], statIndex) => {
                dataView.setUint16(
                    offset + (evolutionIndex * evolutionLength + statIndex) * 2,
                    value,
                    true
                );
            });
        });
    }
}


async function rebuild(data, patchFiles) {
    const buffer = data.buffer.slice(0);
    const dataView = new DataView(buffer);
    const view = new Uint8Array(buffer);
    const {
        spriteMetadata,
        firmware,
        imageInfos,
        charInfos,
        questMode,
        imageDatas,
        animation,
        names,
        evolutions,
        config
    } = data;
    rebuildPatches(dataView, patchFiles)
    rebuildImages(view, spriteMetadata, imageInfos, imageDatas, dataView)
    rebuildQuests(dataView, spriteMetadata, questMode);
    rebuildAnimations(dataView, spriteMetadata, animation)
    rebuildNames(dataView, firmware, spriteMetadata, names)
    rebuildConfig(dataView, spriteMetadata, config)
    rebuildCharacters(dataView, spriteMetadata, config, charInfos)
    rebuildEvolutions(dataView,spriteMetadata, config, evolutions)

    return buffer;
}

const downloadFile = (url, filename) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.click();
};

// Function to convert ArrayBuffer to a binary file and trigger download
// const downloadBIN = (arrayBuffer, filename = 'output.bin') => {
//     // Step 1: Create a Blob from the ArrayBuffer
//     const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
//     // Step 2: Create a URL for the Blob
//     const url = URL.createObjectURL(blob);
//     downloadFile(url, filename);
// };

const init = async arrayBuffer => {
    const buffer = arrayBuffer.slice(0);
    const firmware = await firmwareChecker(buffer);
    if (!firmware) {
        return null;
    }
    const spriteMetadata = firmware ? metadata[firmware.id] : null;
    const imageInfos = getImageInfos(buffer, spriteMetadata);
    const imageDatas = getImages(buffer, spriteMetadata, imageInfos);
    const questMode = getQuestInfos(
        buffer,
        spriteMetadata,
        firmware.id.includes('penc')
    );
    const animation = getAnimation(buffer, spriteMetadata);
    const names = getDigimonNames(
        buffer,
        spriteMetadata,
        firmware.id.includes('+')
    );
    const evolutions = getEvolutions(buffer, spriteMetadata);
    const config = getConfig(buffer, spriteMetadata);
    const charInfos = config ? getNewCharInfos(buffer, spriteMetadata) : getCharInfos(buffer, spriteMetadata);
    return {
        buffer,
        firmware,
        spriteMetadata,
        imageInfos,
        imageDatas,
        charInfos,
        questMode,
        animation,
        names,
        evolutions,
        config

    };
};

// Helper function to convert hex string to Uint8Array
const hexStringToUint8Array = hex => {
    const length = hex.length / 2;
    const byteArray = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
        byteArray[i] = parseInt(hex.substr(i * 2, 2), 16);
    }

    return byteArray;
};

const getPatches = originalData => {
    const { firmware, buffer } = originalData;
    const view = new Uint8Array(buffer.slice(0));
    const patchFiles = firmware.id in PATCHES ? PATCHES[firmware.id] : [];
    const statusPatchFiles = patchFiles.map(file => {
        const { diff } = file;
        let enabled = false;
        diff.forEach(d => {
            const { start, end, data, patched_data } = d;
            const slicedView = view.slice(Number(start), Number(end) + 1);
            const hexString = Array.from(slicedView)
                .map(byte => byte.toString(16).padStart(2, '0'))
                .join('');
            if (hexString === data) {
                enabled = false;
            } else if (hexString === patched_data) {
                enabled = true;
            }
        });
        return { ...file, enabled };
    });
    return statusPatchFiles;
};
export { init, downloadZip, rebuild, getPatches };
