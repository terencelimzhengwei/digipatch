import { Text, Heading, Link, Wrap, WrapItem } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const About = () => {
    return (
        <Wrap display={'flex'} maxWidth={'100%'} p={2}>
            <WrapItem
                borderWidth="2px"
                borderRadius="lg"
                borderStyle="dashed"
                borderColor="gray.500"
                textAlign="left"
                p={5}
                flexDir={'column'}
                width={'100%'}
            >
                <Heading size={['lg', 'xl']}>Instructions</Heading>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    1. Reference the DMC Modding Tutorial guide to extract the
                    firmware bin file from your vpet
                </Text>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    2. Upload the bin file to this app. If it is invalid, try
                    step 1 again as the extracted file may have been corrupt.
                </Text>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    3. If the upload is valid, you can proceed to update the
                    sprites/stats of the firmware.
                </Text>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    4. Once you are done with the edits, click build to download
                    the updated bin file.
                </Text>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    5. Reference the modding tutorial again to write the bin
                    file back onto the device
                </Text>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    6. Turn on your device to test whether the changes have been
                    made
                </Text>
            </WrapItem>
            {/* <WrapItem
                borderWidth="2px"
                borderRadius="lg"
                borderStyle="dashed"
                borderColor="gray.500"
                textAlign="left"
                p={5}
                flexDir={"column"}
                maxWidth={["100%"]}
            >
                <Heading size={['lg','xl']}>Features coming soon</Heading>
                <Text fontWeight={200} fontSize={['sm','lg','xl']}>
                    1. Improve re-rendering performance so that app feels less
                    laggy
                </Text>
                <Text fontWeight={200} fontSize={['sm','lg','xl']}>2. Add update quest mode feature</Text>
                <Text fontWeight={200} fontSize={['sm','lg','xl']}>
                    3. Improve error handling so that user does not input
                    incorrect values
                </Text>
                <Text fontWeight={200} fontSize={['sm','lg','xl']}>
                    4. Add Sprite Library so that user can easily replace
                    Sprites
                </Text>
                <Text fontWeight={200} fontSize={['sm','lg','xl']}>
                    5. Support for custom offsets / image sizes
                </Text>
                <Text fontWeight={200} fontSize={['sm','lg','xl']}>6. Add support for PenC wave 2</Text>
            </WrapItem> */}
            <WrapItem
                borderWidth="2px"
                borderRadius="lg"
                borderStyle="dashed"
                borderColor="gray.500"
                textAlign="left"
                p={5}
                flexDir={'column'}
                width={['100%', '50%']}
            >
                <Heading size={['lg', 'xl']}>Resources & References</Heading>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    1.
                    <Link
                        href="https://docs.google.com/document/d/1CYo0l2pmq4tROpeMIVieCdguyxwkBehPbKnlhIKrwUY/edit#heading=h.5mnkxmcz9uix"
                        isExternal
                    >
                        DMC Modding Tutorial <ExternalLinkIcon mx="2px" />
                    </Link>
                </Text>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    2.
                    <Link
                        href="https://github.com/GMMan/DmcHashCheck"
                        isExternal
                    >
                        DMC Hash Check Repo by cyanic{' '}
                        <ExternalLinkIcon mx="2px" />
                    </Link>
                </Text>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    3.
                    <Link
                        href="https://github.com/GMMan/DigimonColorSpriteTool"
                        isExternal
                    >
                        DMC Sprite Tool by cyanic <ExternalLinkIcon mx="2px" />
                    </Link>
                </Text>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    4.
                    <Link href="https://discord.gg/digimon" isExternal>
                        Digitama Hatchery Discord <ExternalLinkIcon mx="2px" />
                    </Link>
                </Text>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    5.
                    <Link
                        href=" https://github.com/terencelimzhengwei/dmc-mod-app"
                        isExternal
                    >
                        Github Repository for this app{' '}
                        <ExternalLinkIcon mx="2px" />
                    </Link>
                </Text>
            </WrapItem>
            <WrapItem
                borderWidth="2px"
                borderRadius="lg"
                borderStyle="dashed"
                borderColor="gray.500"
                textAlign="left"
                p={5}
                flexDir={'column'}
                flex="1 1 0%"
            >
                <Heading size={['lg', 'xl']}>Credits</Heading>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    1. Cyanic for the code that was referenced for this app.
                    Donate to him{' '}
                    <Link
                        color={'teal.100'}
                        fontWeight={600}
                        href="https://ko-fi.com/caralynx"
                        isExternal
                    >
                        {' '}
                        here
                    </Link>
                </Text>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    2. Humulos for providing a platform for vpet discussion
                </Text>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    3. Kurozatou from Digitama Hatchery Discord for providing
                    the patches. Donate to him{' '}
                    <Link
                        color={'teal.100'}
                        fontWeight={600}
                        href="https://ko-fi.com/kurozatou"
                        isExternal
                    >
                        {' '}
                        here
                    </Link>
                </Text>
            </WrapItem>
        </Wrap>
    );
};

export default About;
