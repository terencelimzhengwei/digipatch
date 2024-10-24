import {
    Flex,
    Box,
    Text,
    Heading,
    Button,
    Wrap,
    WrapItem,
    Link,
} from '@chakra-ui/react';

const PatchCard = ({ index, patch, toggleEnabled }) => {
    const { name, description, enabled, creator, webpage } = patch;
    return (
        <Box
            p={5}
            border="2px dashed"
            borderColor="gray.600"
            borderRadius="lg"
            gap={10}
        >
            <Text fontWeight="bold" fontSize={['l', '2xl']} textAlign="center">
                {name}
            </Text>
            <Text fontWeight="bold" fontSize="xs" textAlign="center">
                Developed by {creator}
            </Text>
            <Text color={'teal.100'} fontSize="xs" textAlign="center" mb={4}>
                <Link href={webpage} isExternal>
                    Ko-fi Page
                </Link>
            </Text>

            <Text fontSize={['xs', 'sm']} textAlign="center" mb={4}>
                {description}
            </Text>
            <Button
                fontSize={['xs', 'sm']}
                mt={4}
                size="md"
                width="100%"
                onClick={() => toggleEnabled(index)}
                colorScheme={enabled ? 'green' : 'gray'}
            >
                {enabled ? 'Enabled' : 'Disabled'}
            </Button>
        </Box>
    );
};

const Patch = ({ patches, updatePatches }) => {
    const toggleEnabled = index => {
        const newPatches = patches.map((patch, i) =>
            index === i ? { ...patch, enabled: !patch.enabled } : patch
        );
        updatePatches(newPatches);
    };
    return (
        <Flex flexDir={'column'} align={'center'} gap={4} p={2}>
            <Box
                borderWidth="2px"
                borderRadius="lg"
                borderStyle="dashed"
                borderColor="gray.500"
                width={'100%'}
                textAlign="center"
                p={5}
            >
                <Heading size={['lg', 'xl']}>Patch your firmware</Heading>
                <Text fontSize={['sm', 'lg', 'xl']} fontWeight={200}>
                    {patches
                        ? 'Select one or more patches to apply to your file'
                        : 'No available patches as patch only available on original firmware'}
                </Text>
            </Box>
            <Wrap>
                {patches.map((patch, index) => (
                    <WrapItem key={`${index}-patchwrapitem`}>
                        <PatchCard
                            key={`${index}-patchcard`}
                            index={index}
                            patch={patch}
                            toggleEnabled={toggleEnabled}
                        />
                    </WrapItem>
                ))}
            </Wrap>
        </Flex>
    );
};

export default Patch;
