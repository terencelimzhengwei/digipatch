import { Box, Image, Divider } from '@chakra-ui/react';

const SpriteAnimation = ({ sprites, animationSequence, frame = 0 }) => {
    const { spriteId, x, y, flip } = animationSequence[frame];

    return (
        <Box
            position="relative"
            width={['16vw', '96px']}
            height={['16vw', '96px']}
            maxW="96px"
            maxH="96px"
            mx="auto"
            overflow={'hidden'}
            borderRadius="8%"
            backgroundImage={
                'data:image/png;base64,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'
            }
        >
            <Divider
                position="absolute"
                top="25%" // 24px from top of a 96px box is approximately 25%
                width="100%"
                border="0.8px dashed rgba(0,0,0,0.5)"
            />

            {/* Bottom Dashed Line */}
            <Divider
                position="absolute"
                bottom="25%" // 24px from bottom of a 96px box is approximately 25%
                width="100%"
                border="0.8px dashed rgba(0,0,0,0.5)"
            />
            <Image
                src={sprites[spriteId].url}
                width={`${(sprites[spriteId].width * 100) / 96}%`} // Adjust based on the screen size
                height={`${(sprites[spriteId].height * 100) / 96}%`}
                position="absolute"
                left={`${(x / 96) * 100}%`} // Calculate percentage-based position
                top={`${(y / 96) * 100}%`}
                transform={flip ? 'scaleX(-1)' : 'scaleX(1)'}
                transformOrigin="center"
                // border="1px dashed rgba(0,0,0,0.5)"
            />
        </Box>
    );
};

export default SpriteAnimation;
