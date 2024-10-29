import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Switch,
  Text,
} from "@chakra-ui/react";

function FrameEditor({ frameData, onUpdateFrame }) {
  return (
    <Flex
      direction="column"
      p={2}
      minW="100px"
      flex="1"
    >
      <FormControl mb={2}>
        <FormLabel fontSize="sm">Sprite ID</FormLabel>
        <Input
          size="sm"
          value={frameData.spriteId}
          onChange={(e) => onUpdateFrame("spriteId", e.target.value)}
        />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel fontSize="sm">X Position</FormLabel>
        <NumberInput
          size="sm"
          value={frameData.x}
          onChange={(valueString) => onUpdateFrame("x", parseInt(valueString))}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>

      <FormControl mb={2}>
        <FormLabel fontSize="sm">Y Position</FormLabel>
        <NumberInput
          size="sm"
          value={frameData.y}
          onChange={(valueString) => onUpdateFrame("y", parseInt(valueString))}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>

      <FormControl display="flex" alignItems="center" mt={2}>
        <FormLabel fontSize="sm" mb="0">
          Flip
        </FormLabel>
        <Switch
          size="sm"
          isChecked={frameData.flip}
          onChange={(e) => onUpdateFrame("flip", e.target.checked)}
        />
      </FormControl>
    </Flex>
  );
}

function AnimationSequenceEditor({ frames, onUpdateSequence }) {
  console.log(onUpdateSequence)
  return (
    <Flex wrap="wrap" gap={4}>
      {frames.map((frame, index) => (
        <Box key={index} p={2} border="1px solid gray" borderRadius="md" minW="120px" flex="1 0 10%">
          <Text fontSize="sm" fontWeight="bold" mb={2}>
            Frame {index + 1}
          </Text>
          <FrameEditor
            frameData={frame}
            onUpdateFrame={(field, value) => {
              const newFrames = [...frames];
              newFrames[index] = { ...newFrames[index], [field]: value };
              onUpdateSequence(newFrames);
            }}
          />
        </Box>
      ))}
    </Flex>
  );
}

export default AnimationSequenceEditor;