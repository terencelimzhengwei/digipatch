import {
    Flex,
    Box,
    Text,
    Heading,
    Slider,
    SliderTrack,
    SliderThumb,
    SliderFilledTrack,
    SliderMark,
    IconButton,
    useInterval,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
    Button,
} from '@chakra-ui/react';
import { useState, memo } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import SpriteAnimation from './SpriteAnimation';

const MemoSpriteSelect = memo(
    ({ spriteLabels, frame, id, value, handleInputChange }) => {
        return (
            <Select
                value={value}
                onChange={e => handleInputChange(frame, id, e.target.value)}
            >
                {spriteLabels.map((label, index) => (
                    <option key={`${index}-sprite`} value={index}>
                        {label}
                    </option>
                ))}
            </Select>
        );
    }
);

const MemoFlipSelect = memo(({ frame, id, value, handleInputChange }) => (
    <Select
        value={value}
        onChange={e => handleInputChange(frame, id, e.target.value)}
    >
        <option value={0}>No</option>
        <option value={1}>Yes</option>
    </Select>
));

const MemoNumberInput = memo(
    ({ index, frame, id, value, handleInputChange }) => (
        <NumberInput
            key={`${index}-numberinput`}
            size="md"
            value={value}
            min={0}
            max={96}
            onChange={e => handleInputChange(frame, id, e)}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    )
);

const UpdateAnimation = ({ data, updateAnimation }) => {
    const { animation, charInfos, imageDatas, spriteMetadata } = data;
    const [frame, setFrame] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [newAnimation, setNewAnimation] = useState(animation);
    const spriteLabels = spriteMetadata.CharSpriteLabel;
    const sprites = charInfos.map(c => {
        return imageDatas
            .slice(c.SpriteID, c.SpriteID + spriteLabels.length)
            .map(x => ({
                url: x.url,
                width: x.imageData.width,
                height: x.imageData.height,
            }));
    });
    const { spriteId, x, y, flip } = animation[frame];

    // Handle saving updates from StageCard
    const updateNewAnimation = (frame, key, value) => {
        const copiedAnimation = [...newAnimation];
        copiedAnimation[frame][key] = value;
        setNewAnimation(copiedAnimation);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    useInterval(() => {
        if (isPlaying === true) {
            setFrame(prevFrame => (prevFrame + 1) % animation.length);
        }
    }, 500);

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
                <Heading size={['lg', 'xl']}>Update Animations</Heading>
                <Text fontWeight={200} fontSize={['sm', 'lg', 'xl']}>
                    To update the animations for your device, please update the
                    parameters below
                </Text>
            </Box>
            <Flex
                flexDir="row"
                flexWrap={'wrap'}
                align={'stretch'}
                justify={'center'}
                width={'100%'}
                gap={4}
            >
                <Flex
                    borderWidth="2px"
                    borderRadius="lg"
                    borderStyle="dashed"
                    borderColor="gray.500"
                    flexDir={'row'}
                    flexWrap={'wrap'}
                    width={['100%', '100%', '100%', '70%']}
                    align={'center'}
                    justify={'center'}
                    p={5}
                    gap={2}
                >
                    <Heading width="100%" size={['md', 'lg']}>
                        Idle Sprite Animation
                    </Heading>
                    {sprites.map((s, index) => (
                        <SpriteAnimation
                            key={`${index}-sprite-animation`}
                            animationSequence={newAnimation}
                            sprites={s}
                            frame={frame}
                        />
                    ))}
                </Flex>
                <Flex
                    flex="1"
                    borderWidth="2px"
                    borderRadius="lg"
                    borderStyle="dashed"
                    borderColor="gray.500"
                    flexDir={'row'}
                    flexWrap={'wrap'}
                    flexGrow={1}
                    align={'baseline'}
                    justify={'center'}
                    p={5}
                    gap={2}
                >
                    <Heading width="100%" size={['md', 'lg']}>
                        Edit
                    </Heading>
                    <Flex flexDir={'row'} width={'100%'} gap={5}>
                        <IconButton
                            onClick={togglePlayPause}
                            icon={isPlaying ? <FaPause /> : <FaPlay />}
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                            fontSize="sm" // Adjust icon size as needed
                            size="sm" // Adjust button size as needed
                        />
                        <Slider
                            aria-label="slider-ex-2"
                            colorScheme="black"
                            defaultValue={0}
                            value={frame}
                            min={0}
                            max={animation.length - 1}
                            step={1}
                            onChange={val => setFrame(val)}
                        >
                            <SliderMark
                                value={frame}
                                fontSize={'xs'}
                                textAlign="center"
                                // bg='blue.500'
                                mt="-5"
                                ml="-5"
                            >
                                F: {frame + 1}
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </Flex>
                    <Flex flexDir="column" width={'100%'} gap={2}>
                        <Text fontSize={'sm'}>Sprite Type</Text>
                        <MemoSpriteSelect
                            spriteLabels={spriteLabels}
                            frame={frame}
                            id="spriteId"
                            value={spriteId}
                            handleInputChange={updateNewAnimation}
                        />
                        <Text fontSize={'sm'}>X Position</Text>
                        <MemoNumberInput
                            frame={frame}
                            id="x"
                            value={x}
                            handleInputChange={updateNewAnimation}
                        />
                        <Text fontSize={'sm'}>Y Position</Text>
                        <MemoNumberInput
                            frame={frame}
                            id="y"
                            value={y}
                            handleInputChange={updateNewAnimation}
                        />
                        <Text fontSize={'sm'}>Flip</Text>
                        <MemoFlipSelect
                            frame={frame}
                            id="flip"
                            value={flip}
                            handleInputChange={updateNewAnimation}
                        />
                    </Flex>
                    <Button
                        fontSize={['sm', 'md']}
                        width={'100%'}
                        colorScheme="green"
                        onClick={() => updateAnimation(newAnimation)}
                    >
                        Save
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default UpdateAnimation;
