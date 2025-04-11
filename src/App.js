import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    extendTheme,
    Flex,
    useToast,
} from '@chakra-ui/react';
import Nav from './components/Nav';
import UploadBIN from './components/UploadBIN';
import UpdateSprite from './components/UpdateSprite';
import { init, rebuild, downloadZip, getPatches } from './utils/analyzer';
import UpdateStats from './components/UpdateStats';
import UpdateQuest from './components/UpdateQuest';
import UpdateAnimation from './components/UpdateAnimation';
import About from './components/About';
import Patch from './components/Patch';
import { getImageDetails, arrayBufferToImageData } from './utils/imageUtils';

// Create a theme with default mode set to dark
const theme = extendTheme({
    config: {
        initialColorMode: 'dark', // Set default color mode to dark
        useSystemColorMode: false, // Do not use system color mode
    },
});

function App() {
    const [page, setPage] = useState(0);
    const [originalData, setOriginalData] = useState(null);
    const [data, setData] = useState(null);
    const [patchFiles, setPatchFiles] = useState([]);
    const [resetSpriteView, setResetSpriteView] = useState(0);
    const toast = useToast();

    const navClick = p => {
        setPage(p);
    };

    const restartClick = () => {
        setOriginalData(null);
        setData(null);
        setPage(0);
    };

    const buildClick = async () => {
        const buffer = await rebuild(data, patchFiles);
        const newData = { ...data, buffer: buffer.slice(0) };
        const imageUrls = data.imageDatas.map(x => x.url);
        setData(newData);
        downloadZip(newData.buffer, imageUrls);
        toast({
            title: 'BIN built and downloaded',
            description: 'The updated bin has been downloaded as output.bin',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'bottom-right',
        });
    };

    const updateSprite = data => {
        if (data.buffer.length > 8388608) {
            toast({
                title: 'Sprites not updated',
                description:
                    'Sprites not updated as it goes beyond the 8MB limit available. This may be due to using Character Sprites above 48x48, or adding too many new sprites.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
            return;
        }
        setData(data);
        toast({
            title: 'Sprites Updated',
            description: 'Your sprites have been updated',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'bottom-right',
        });
    };

    const updateStats = data => {
        setData(data);
        toast({
            title: 'Stats Updated',
            description: 'Your stats have been updated',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'bottom-right',
        });
    };

    const updateQuests = data => {
        setData(data);
        toast({
            title: 'Quests Updated',
            description: 'Your quests changes have been updated',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'bottom-right',
        });
    };

    const updatePatches = patches => {
        setPatchFiles(patches);
    };

    const updateAnimation = animation => {
        setData({ ...data, animation });
        toast({
            title: 'Animations Updated',
            description: 'Your sprites idle animation has been updated',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'bottom-right',
        });
    };

    const handleJsonImport = async jsonData => {
        // Show loading toast
        const loadingToast = toast({
            title: 'Applying Mod',
            description: 'Please wait while we apply your mod...',
            status: 'info',
            duration: null, // null duration means it won't auto-close
            isClosable: false,
            position: 'bottom-right',
        });

        try {
            // Validate JSON structure
            if (
                !jsonData.animation ||
                !jsonData.digimons ||
                !jsonData.quest_mode
            ) {
                toast.close(loadingToast);
                toast({
                    title: 'Invalid Mod File',
                    description:
                        'The mod file is invalid. Please ensure that the mod file is valid',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'bottom-right',
                });
                return;
            }

            // Check source version
            if (jsonData.source_version !== data.firmware.id) {
                toast.close(loadingToast);
                toast({
                    title: 'Version Mismatch',
                    description: `The JSON file is for version ${jsonData.version_name}, but the current firmware is ${data.firmware.name}`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'bottom-right',
                });
                return;
            }

            // Update animation
            const newData = { ...data };
            newData.animation = jsonData.animation;

            // Update character stats
            newData.charInfos = jsonData.digimons.map(digimon => digimon.stats);

            // Update quest mode
            newData.questMode = jsonData.quest_mode;

            // Process sprite URLs if they exist
            if (jsonData.sprite_urls) {
                try {
                    const imagePromises = jsonData.sprite_urls.map(
                        async (url, index) => {
                            const response = await fetch(url);
                            const blob = await response.blob();
                            const file = new File([blob], `${index}.png`, {
                                type: 'image/png',
                            });
                            const { name, imageData, rgb565 } =
                                await getImageDetails(file);

                            if (imageData.width > 96 || imageData.height > 96) {
                                throw new Error(
                                    `Image ${index} exceeds maximum dimensions of 96x96`
                                );
                            }

                            return {
                                name,
                                imageData,
                                rgb565,
                            };
                        }
                    );

                    const imageDetails = await Promise.all(imagePromises);
                    const newImageDatas = imageDetails.map(
                        ({ imageData, rgb565 }) =>
                            arrayBufferToImageData(
                                rgb565,
                                imageData.width,
                                imageData.height
                            )
                    );

                    // Update imageInfos with new dimensions
                    const dataOffsets = [];
                    dataOffsets.push(newData.imageInfos[0].dataOffset);
                    const imageSizes = newImageDatas.map((image, index) => {
                        const { height, width } = image.imageData;
                        const imageLength = height * width * 2;
                        dataOffsets.push(dataOffsets[index] + imageLength);
                        return { width, height };
                    });

                    const newImageInfos = imageSizes.map((size, index) => {
                        const { width, height } = size;
                        const dataOffset = dataOffsets[index];
                        return { width, height, dataOffset };
                    });

                    // Check if the total size exceeds the flash chip limit
                    if (
                        Number(newData.spriteMetadata.SpritePackBase) +
                            dataOffsets.slice(-1)[0] >
                        Number(0x7fcfff)
                    ) {
                        toast.close(loadingToast);
                        toast({
                            title: 'Over flash chip size limit',
                            description:
                                'There is insufficient space to store all your sprites in the flash chip',
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                            position: 'bottom-right',
                        });
                        return;
                    }

                    newData.imageDatas = newImageDatas;
                    newData.imageInfos = newImageInfos;
                } catch (error) {
                    toast.close(loadingToast);
                    toast({
                        title: 'Error Processing Sprites',
                        description:
                            error.message ||
                            'Failed to process some sprite URLs',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                        position: 'bottom-right',
                    });
                    return;
                }
            }

            setData(newData);

            // Update the loading toast to success
            toast.update(loadingToast, {
                title: 'Mod Applied',
                description:
                    'The mod has been successfully applied. Please proceed to edit or build your BIN file',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            // Reset the sprite view
            setResetSpriteView(prev => prev + 1);
        } catch (error) {
            // Handle any unexpected errors
            toast.close(loadingToast);
            toast({
                title: 'Import Failed',
                description:
                    'An unexpected error occurred while importing the mod file',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    };

    const handleUpload = async arrayBuffer => {
        const originalData = await init(arrayBuffer);
        console.log(originalData);
        if (!originalData || !originalData.firmware) {
            toast({
                title: 'Invalid BIN File',
                description:
                    'Unable to decode BIN File. Ensure that BIN file is valid',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
            return;
        }
        if (
            originalData.firmware.identifierValid &
            originalData.firmware.regionValid
        ) {
            setOriginalData(originalData);
            setData(originalData);
            setPatchFiles(getPatches(originalData));
            setPage(1);
            toast({
                title: `${originalData.firmware.name} firmware`,
                description: `Please proceed to modify your ${originalData.firmware.name} firmware`,
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
            return;
        } else {
            setOriginalData(originalData);
            setData(originalData);
            setPatchFiles(getPatches(originalData));
            setPage(1);
            toast({
                title: `Modified ${originalData.firmware.name} detected`,
                description: originalData.firmware.id.includes('+')
                    ? `Firmware is a modified ${originalData.firmware.name} that uses Kurozatou's PenC+ mod`
                    : `Firmware is a modified ${originalData.firmware.name}`,
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
            return;
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Box
                textAlign="center"
                fontSize="xl"
                w={['100%', '100%', '100%', '100%', '80%']}
                mx="auto"
            >
                <Flex p={3} flexDir={'column'}>
                    <Nav
                        fileUploaded={originalData !== null}
                        pageActive={page}
                        navClick={navClick}
                        restartClick={restartClick}
                        buildClick={buildClick}
                        onJsonImport={handleJsonImport}
                    />
                    {!originalData & (page === 0) ? (
                        <UploadBIN handleUpload={handleUpload} />
                    ) : null}
                    {page === 1 ? (
                        <UpdateSprite
                            updateSprite={updateSprite}
                            data={data}
                            reset={resetSpriteView}
                        />
                    ) : null}
                    {page === 2 ? (
                        <UpdateStats data={data} updateData={updateStats} />
                    ) : null}
                    {page === 3 ? (
                        <UpdateQuest data={data} updateQuests={updateQuests} />
                    ) : null}
                    {page === 4 ? (
                        <Patch
                            patches={patchFiles}
                            updatePatches={updatePatches}
                        />
                    ) : null}
                    {page === 5 ? <About /> : null}
                    {page === 6 ? (
                        <UpdateAnimation
                            data={data}
                            updateAnimation={updateAnimation}
                        />
                    ) : null}
                </Flex>
            </Box>
        </ChakraProvider>
    );
}

export default App;
