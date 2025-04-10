import { Box, Text, Heading } from '@chakra-ui/react';
import EditableTable from './EditableTable';

const UpdateStats = ({ data, updateData }) => {
    const updateCharInfos = newData => {
        updateData(newData);
    };

    return (
        <Box>
            <Box
                borderWidth="2px"
                borderRadius="lg"
                borderStyle="dashed"
                borderColor="gray.500"
                width={'100%'}
                textAlign="center"
                p={5}
                mb={'8px'}
            >
                <Heading size={['lg', 'xl']}>Update Character Stats</Heading>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    To update stats of your characters, click the edit button,
                    change the stats accordingly and save.
                </Text>
            </Box>
            <EditableTable data={data} updateCharInfos={updateCharInfos} />

            {/* <Box width={'100%'}>
                <VStack spacing={4} width="100%">
                    {' '}
                    {characters.map((character, index) => (
                        <CharacterCard
                            key={index}
                            character={character}
                            updateCharacter={updateCharacter}
                        />
                    ))}
                </VStack>
            </Box> */}
        </Box>
    );
};

export default UpdateStats;
