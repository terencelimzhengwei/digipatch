import React, { useState } from 'react';
import {
    Box,
    Image,
    Text,
    Input,
    Button,
    Stack,
    Flex,
    Center,
    Select,
} from '@chakra-ui/react';
import { pattern, valueToPattern } from '../config/pattern';

const StageCard = ({ stage, stageIndex, numChars, updateStage }) => {
    const [editStage, setEditStage] = useState(false);
    const [stageData, setStageData] = useState(stage);

    // Toggle edit mode
    const toggleEdit = () => {
        if (editStage) {
            const newStageData = stageData.map(
                character => character.attributes
            );
            updateStage(stageIndex, newStageData); // Only save when exiting edit mode
        }
        setEditStage(prevState => !prevState);
    };

    const handleInputChange = (e, key, charIndex) => {
        const newStageData = stageData.map((character, i) =>
            charIndex === i
                ? {
                      ...character,
                      attributes: {
                          ...character.attributes,
                          [key]: Number(e.target.value),
                      },
                  }
                : character
        );
        setStageData(newStageData);
    };

    return (
        <Box
            p={5}
            border="2px dashed"
            borderColor="gray.600"
            borderRadius="lg"
            gap={10}
            mx="auto" // Centering the card horizontally
        >
            <Text
                fontWeight="bold"
                fontSize={['xl', '2xl']}
                textAlign="center"
                mb={4}
            >
                Stage {stageIndex + 1}
            </Text>
            <Flex
                gap={4}
                flexWrap="wrap" // Allow wrapping on smaller screens
                justifyContent="center"
            >
                {stage.map((character, charIndex) => (
                    <Flex
                        key={charIndex}
                        direction="column"
                        align="center"
                        mb={4}
                    >
                        <Box>
                            <Center>
                                <Image
                                    borderRadius={'10%'}
                                    src={character.Sprite}
                                    fallbackSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAA6ElEQVRIx+3UwQ6CMAzGcd7/YajRdIZ1HjQW9liODXCo1PZgTIzfgdP/B8sONEhE3pN22FBkco446kYNMUKaYzUgyAta4F0BbvgUoGA8EnH+hOvVIHJwLvT6a03PYYjRBAz7gy+BgY0gHM4mEHawPxtA6gH2FzXI/UrI4FT6Wohg6Sshgaq/CwGseoDD5Q146GexCZ76SWyBF30RNWC6in0WFeiPgCz2o7iD1MMkNvv0v/MzyH0RQg84g6lPr7hK/QKWPh1T6mdQ9W9WgL4vwNBnYOkz6MAGPP4CaPV9O4IODet8g940vAF536t7Ag/0WAAAAABJRU5ErkJggg=="
                                    alt="Character"
                                    boxSize={['30px', '35px', '40px']}
                                />
                            </Center>
                        </Box>
                        {Object.keys(character.attributes).map(
                            (attributeKey, i) => (
                                <Stack
                                    align="center"
                                    gap={0}
                                    key={`field-${i}`}
                                    width={['80px', '100px']} // Adjust width for different screen sizes
                                >
                                    <Text fontWeight={'bold'}>
                                        {attributeKey}
                                    </Text>
                                    {editStage ? (
                                        !['CharacterID', 'Pattern'].includes(
                                            attributeKey
                                        ) ? (
                                            <Input
                                                size="xs"
                                                textAlign={'center'}
                                                defaultValue={
                                                    character.attributes[
                                                        attributeKey
                                                    ]
                                                }
                                                onChange={e =>
                                                    handleInputChange(
                                                        e,
                                                        attributeKey,
                                                        charIndex
                                                    )
                                                }
                                            />
                                        ) : (
                                            <Select
                                                size="xs"
                                                defaultValue={
                                                    character.attributes[
                                                        attributeKey
                                                    ]
                                                }
                                                onChange={e =>
                                                    handleInputChange(
                                                        e,
                                                        attributeKey,
                                                        charIndex
                                                    )
                                                }
                                            >
                                                {attributeKey === 'Pattern'
                                                    ? Object.keys(pattern).map(
                                                          p => (
                                                              <option
                                                                  value={
                                                                      pattern[p]
                                                                  }
                                                              >
                                                                  {p}
                                                              </option>
                                                          )
                                                      )
                                                    : [
                                                          ...Array.from(
                                                              {
                                                                  length: numChars,
                                                              },
                                                              (_, i) => i
                                                          ),
                                                          65535,
                                                      ].map(index => (
                                                          <option value={index}>
                                                              {index}
                                                          </option>
                                                      ))}
                                            </Select>
                                        )
                                    ) : (
                                        <Text fontSize={'xs'}>
                                            {attributeKey === 'Pattern'
                                                ? valueToPattern(
                                                      character.attributes[
                                                          attributeKey
                                                      ]
                                                  )
                                                : character.attributes[
                                                      attributeKey
                                                  ]}
                                        </Text>
                                    )}
                                </Stack>
                            )
                        )}
                    </Flex>
                ))}
            </Flex>
            <Button mt={4} size="md" width="100%" onClick={toggleEdit}>
                {editStage ? 'Save' : 'Edit Stage'}
            </Button>
        </Box>
    );
};

export default StageCard;
