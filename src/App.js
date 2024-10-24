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
import { init, rebuild, downloadBIN, getPatches } from './utils/analyzer';
import UpdateStats from './components/UpdateStats';
import UpdateQuest from './components/UpdateQuest';
import UpdateAnimation from './components/UpdateAnimation';
import About from './components/About';
import Patch from './components/Patch';

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
        setData(newData);
        downloadBIN(newData.buffer);
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

    const handleUpload = async arrayBuffer => {
        const originalData = await init(arrayBuffer);
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
                description: `Firmware identified to be a modified ${originalData.firmware.name} as it failed region checks. Do note that app might not work correctly if you have added additional sprites or included sprites of different sizes than the original`,
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
            <Box textAlign="center" fontSize="xl">
                <Flex p={3} flexDir={'column'}>
                    <Nav
                        fileUploaded={originalData !== null}
                        pageActive={page}
                        navClick={navClick}
                        restartClick={restartClick}
                        buildClick={buildClick}
                    />
                    {!originalData & (page === 0) ? (
                        <UploadBIN handleUpload={handleUpload} />
                    ) : null}
                    {page === 1 ? (
                        <UpdateSprite updateSprite={updateSprite} data={data} />
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
                    {page === 6 ? <UpdateAnimation data={data} updateAnimation={null} /> : null}
                </Flex>
            </Box>
        </ChakraProvider>
    );
}

export default App;
