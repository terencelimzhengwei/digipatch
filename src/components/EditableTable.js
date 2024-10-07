import React, { useState, memo } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    Image,
    IconButton,
    Box,
} from '@chakra-ui/react';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';

const EditableCell = memo(
    ({ index, inputValue, rawValue, isEdit, handleInputChange }) => {
        if (isEdit) {
            return (
                <Input
                    key={`cell-${index}`}
                    value={inputValue}
                    onChange={e => handleInputChange(e, index)}
                    size="sm"
                    textAlign="center"
                />
            );
        }
        return rawValue;
    }
);

const ImageCell = memo(({ rowIndex, src }) => (
    <Box display="flex" justifyContent="center" alignItems="center">
        <Image
            key={`${rowIndex}-SpriteImage`}
            fallbackSrc="https://via.placeholder.com/48"
            src={src}
            alt="Sprite"
            boxSize="30px"
        />
    </Box>
));

const EditableRow = ({
    row,
    rowIndex,
    editRowIndex,
    handleSaveClick,
    handleEditClick,
}) => {
    const [localRowData, setLocalRowData] = useState(row.attributes); // Local state for row data

    const handleInputChange = (e, key) => {
        setLocalRowData({
            ...localRowData,
            [key]: Number(e.target.value),
        });
    };

    const saveChanges = () => {
        handleSaveClick(rowIndex, localRowData);
    };

    return (
        <Tr key={`row-${rowIndex}`}>
            <Td textAlign="center" verticalAlign="middle">
                <ImageCell rowIndex={rowIndex} src={row.SpriteImage} />
            </Td>
            <Td textAlign="center" verticalAlign="middle">
                <ImageCell rowIndex={rowIndex} src={row.AttackImage} />
            </Td>
            <Td textAlign="center" verticalAlign="middle">
                {row.AltAttackImage ? (
                    <ImageCell rowIndex={rowIndex} src={row.AltAttackImage} />
                ) : null}
            </Td>
            {Object.keys(row.attributes).map(key => (
                <Td key={`td-${key}`} textAlign="center" verticalAlign="middle">
                    <EditableCell
                        index={key}
                        inputValue={localRowData[key]}
                        rawValue={row.attributes[key]}
                        isEdit={editRowIndex === rowIndex}
                        handleInputChange={handleInputChange}
                    />
                </Td>
            ))}
            <Td textAlign="center" verticalAlign="middle">
                {editRowIndex === rowIndex ? (
                    <IconButton
                        icon={<CheckIcon />}
                        onClick={saveChanges}
                        aria-label="Save"
                        size="sm"
                    />
                ) : (
                    <IconButton
                        icon={<EditIcon />}
                        onClick={() => handleEditClick(rowIndex, row)}
                        aria-label="Edit"
                        size="sm"
                    />
                )}
            </Td>
        </Tr>
    );
};

const generateCharacters = (charInfos, imageDatas) => {
    return charInfos.map((info, index) => {
        return {
            index,
            attributes: info,
            SpriteImage: imageDatas[info.SpriteID].url,
            AttackImage:
                info.AttackSprite < imageDatas.length
                    ? imageDatas[info.AttackSprite + 1].url
                    : null,
            AltAttackImage:
                info.AltAttackSprite < imageDatas.length
                    ? imageDatas[info.AltAttackSprite + 1].url
                    : null,
        };
    });
};

const generateCharacter = (previousCharacter, newAttributes, imageDatas) => {
    return {
        ...previousCharacter,
        attributes: newAttributes,
        SpriteImage: imageDatas[newAttributes.SpriteID].url,
        AttackImage:
            newAttributes.AttackSprite < imageDatas.length
                ? imageDatas[newAttributes.AttackSprite + 1].url
                : null,
        AltAttackImage:
            newAttributes.AltAttackSprite < imageDatas.length
                ? imageDatas[newAttributes.AltAttackSprite + 1].url
                : null,
    };
};

const EditableTable = ({ data, updateCharInfos }) => {
    const { charInfos, imageDatas } = data;
    const [tableData, setTableData] = useState(
        generateCharacters(charInfos, imageDatas)
    );
    const [editRowIndex, setEditRowIndex] = useState(null);

    const handleEditClick = (index, rowData) => {
        setEditRowIndex(index);
    };

    const handleSaveClick = (rowIndex, newAttributes) => {
        const updatedTableData = [...tableData];
        updatedTableData[rowIndex] = generateCharacter(
            updatedTableData[rowIndex],
            newAttributes,
            imageDatas
        ); // Apply changes from editedRowData to tableData
        setTableData(updatedTableData);
        const attributes = updatedTableData.map(row => row.attributes);
        const updatedData = { ...data, charInfos: attributes };
        updateCharInfos(updatedData);
        setEditRowIndex(null); // Reset editRowIndex after saving
    };

    return (
        <Box
            border="2px dashed"
            borderColor="gray.600"
            borderRadius="lg"
            overflow="auto"
            p={4}
        >
            <Table variant="simple" size="sm">
                <Thead>
                    <Tr>
                        <Th textAlign="center">Sprite</Th>
                        <Th textAlign="center">AtkSprite</Th>
                        <Th textAlign="center">AltAtkSprite</Th>
                        {data.spriteMetadata.Stats.map((stat, index) => (
                            <Th key={`header-${index}`} textAlign="center">
                                {stat}
                            </Th>
                        ))}
                        <Th textAlign="center">Edit</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tableData.map((row, rowIndex) => (
                        <EditableRow
                            key={rowIndex}
                            row={row}
                            rowIndex={rowIndex}
                            editRowIndex={editRowIndex}
                            handleSaveClick={handleSaveClick}
                            handleEditClick={handleEditClick}
                        />
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default EditableTable;
