import { Flex, Box, Text, Heading } from '@chakra-ui/react';
import SpriteAnimation from './SpriteAnimation';
import AnimationEditor from './AnimationEditor';

const UpdateAnimation = ({ data, updateAnimation }) => {
    console.log(data)
    const { animation, charInfos, imageDatas, spriteMetadata } = data
    const spriteLabels = spriteMetadata.CharSpriteLabel
    const sprites = charInfos.map((c)=> {
        return imageDatas.slice(c.SpriteID, c.SpriteID + spriteLabels.length).map((x)=>x.url)
    })
    console.log(sprites)
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
                    To update the animations for your device, please update
                    the parameters below
                </Text>
            </Box>
            <Flex flexDir="row" flexWrap={"wrap"} align={'stretch'} justify={"center"} width={"100%"} gap={4}>
                <Flex borderWidth="2px"
                    borderRadius="lg"
                    borderStyle="dashed"
                    borderColor="gray.500" flexDir={'row'} flexWrap={"wrap"} width={["100%","100%","100%"]} align={'center'} justify={"center"} p={5}>
                    <Heading width="100%" size={['md', 'lg']}>Idle Sprite Animation</Heading>
                    {sprites.map((s)=>(<SpriteAnimation animationSequence={animation} sprites={s} frameInterval={500}/>))}
                </Flex>
                <Flex 
                    flex="1"
                    borderWidth="2px"
                    borderRadius="lg"
                    borderStyle="dashed"
                    borderColor="gray.500" flexDir={'row'} flexWrap={"wrap"} flexGrow={1} align={"baseline"} justify={"center"} p={5}>
                    <Heading width="100%" size={['md', 'lg']}>Edit Idle Sprite Animation</Heading>
                    <AnimationEditor animationSequence={animation} updateAnimationSequence={null}/>
                </Flex>
            </Flex>
            {/* <QuestTable data={data} updateQuests={updateQuests} /> */}
        </Flex>
    );
};

export default UpdateAnimation;
