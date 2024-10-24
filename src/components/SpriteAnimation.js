import { useState } from 'react';
import { Box, Image, useInterval } from '@chakra-ui/react';

const SpriteAnimation = ({ sprites, animationSequence, frameInterval = 100 }) => {
    const [currentFrame, setCurrentFrame] = useState(0);
  
    // Loop through the frames continuously
    useInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % animationSequence.length);
    }, frameInterval);
  
    const { spriteId, x, y, flip } = animationSequence[currentFrame];
  
    return (
      <Box
        position="relative"
        width={["16vw","96px"]} // Adjust size for smaller screens
        height={["8vw","48px"]} // Maintain the 2:1 aspect ratio
        maxW="96px"
        maxH="48px"
        overflow="hidden"
        mx="auto" // Center the animation horizontally
      >
        <Image
          src={sprites[spriteId]}
          width="50%" // Adjust based on the screen size
          height="100%"
          position="absolute"
          left={`${(x / 96) * 100}%`} // Calculate percentage-based position
          top={`${((y-24) / 48) * 100}%`}
          transform={flip ? 'scaleX(-1)' : 'scaleX(1)'}
          transformOrigin="center"
        />
      </Box>
    );
  };
  
  export default SpriteAnimation;
