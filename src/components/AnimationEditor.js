import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    Checkbox,
    Button,
    VStack,
    useBreakpointValue,
  } from '@chakra-ui/react';
  
  const AnimationEditor = ({ animationSequence, updateAnimationSequence }) => {
    // Handle updates to specific frame properties
    const handleUpdate = (index, key, value) => {
      const updatedSequence = [...animationSequence];
      updatedSequence[index][key] = value;
      updateAnimationSequence(updatedSequence);
    };
  
    const inputSize = useBreakpointValue({ base: 'sm', md: 'md' }); // Responsive input size
  
    return (
      <VStack spacing={4} align="stretch" p={4} bg="gray.800" borderRadius="md" width={"100%"}>
        <Table variant="simple" colorScheme="whiteAlpha" size="sm">
          <Thead>
            <Tr>
              <Th color="white">Frame</Th>
              <Th color="white">Sprite ID</Th>
              <Th color="white">X Position</Th>
              <Th color="white">Y Position</Th>
              <Th color="white">Flip</Th>
            </Tr>
          </Thead>
          <Tbody>
            {animationSequence.map((frame, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>
                  <Input
                    type="number"
                    value={frame.spriteId}
                    onChange={(e) =>
                      handleUpdate(index, 'spriteId', parseInt(e.target.value, 10))
                    }
                    bg="gray.700"
                    color="white"
                    size={inputSize} // Responsive size
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={frame.x}
                    onChange={(e) =>
                      handleUpdate(index, 'x', parseInt(e.target.value, 10))
                    }
                    bg="gray.700"
                    color="white"
                    size={inputSize} // Responsive size
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={frame.y}
                    onChange={(e) =>
                      handleUpdate(index, 'y', parseInt(e.target.value, 10))
                    }
                    bg="gray.700"
                    color="white"
                    size={inputSize} // Responsive size
                  />
                </Td>
                <Td>
                  <Checkbox
                    isChecked={frame.flip}
                    onChange={(e) => handleUpdate(index, 'flip', e.target.checked)}
                    colorScheme="green"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button
          colorScheme="green"
          alignSelf="center"
          onClick={() => console.log('Updated Sequence:', animationSequence)}
        >
          Save Changes
        </Button>
      </VStack>
    );
  };
  
  export default AnimationEditor;
  
