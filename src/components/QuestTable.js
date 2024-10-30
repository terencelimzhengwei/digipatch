import React from 'react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import StageCard from './StageCard'; // Import the new StageCard component

const generateQuests = (questMode, charInfos, imageDatas, isPenc = false) =>
    questMode.map(level => {
        return level
            .map(enemy => {
                const { CharacterID } = enemy;
                const isValidCharacterID = isPenc
                    ? CharacterID !== 0
                    : CharacterID !== 65535;
                return {
                    Sprite: isValidCharacterID
                        ? imageDatas[charInfos[CharacterID].SpriteID].url
                        : null,
                    attributes: { ...enemy },
                };
            })
            .slice(0, isPenc ? 3 : 5);
    });

const QuestTable = ({ data, updateQuests }) => {
    const { questMode, charInfos, imageDatas, firmware } = data;
    const isPenc = firmware.id.includes('penc');
    const quests = generateQuests(questMode, charInfos, imageDatas, isPenc);

    // Handle saving updates from StageCard
    const updateStage = (stageIndex, updatedValues) => {
        const newQuestMode = [...questMode];
        newQuestMode[stageIndex] = updatedValues;
        updateQuests({ ...data, questMode: newQuestMode });
    };

    return (
        <Wrap fontSize={'sm'} gap={1} justify="center" align="center">
            {quests.map((stage, stageIndex) => (
                <WrapItem key={stageIndex}>
                    <StageCard
                        stage={stage}
                        stageIndex={stageIndex}
                        numChars={charInfos.length}
                        updateStage={updateStage}
                    />
                </WrapItem>
            ))}
        </Wrap>
    );
};

export default QuestTable;
