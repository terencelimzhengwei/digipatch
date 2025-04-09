import { useState, memo } from 'react';
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
    ({ index, inputValue, rawValue, isEdit, handleInputChange, isName = false }) => {
        if (isEdit) {
            return (
                <Input
                    key={`cell-${index}`}
                    value={inputValue}
                    onChange={e => handleInputChange(e, index)}
                    size="sm"
                    textAlign="center"
                    minWidth={50}
                    maxLength={isName ? 16 : undefined}
                    pattern={isName ? '[A-Z_]*' : undefined}
                    onInput={isName ? (e) => {
                        e.target.value = e.target.value.toUpperCase().replace(/[^A-Z_]/g, '');
                    } : undefined}
                />
            );
        }
        return rawValue;
    }
);

const ImageCell = memo(({ rowIndex, src }) => (
    <Box display="flex" justifyContent="center" alignItems="center">
        <Image
            borderRadius={'10%'}
            key={`${rowIndex}-SpriteImage`}
            fallbackSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAA6ElEQVRIx+3UwQ6CMAzGcd7/YajRdIZ1HjQW9liODXCo1PZgTIzfgdP/B8sONEhE3pN22FBkco446kYNMUKaYzUgyAta4F0BbvgUoGA8EnH+hOvVIHJwLvT6a03PYYjRBAz7gy+BgY0gHM4mEHawPxtA6gH2FzXI/UrI4FT6Wohg6Sshgaq/CwGseoDD5Q146GexCZ76SWyBF30RNWC6in0WFeiPgCz2o7iD1MMkNvv0v/MzyH0RQg84g6lPr7hK/QKWPh1T6mdQ9W9WgL4vwNBnYOkz6MAGPP4CaPV9O4IODet8g940vAF536t7Ag/0WAAAAABJRU5ErkJggg=="
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
    const [localName, setLocalName] = useState(row.name || ''); // Local state for name

    const handleInputChange = (e, key) => {
        if (key === 'name') {
            setLocalName(e.target.value);
        } else {
            setLocalRowData({
                ...localRowData,
                [key]: Number(e.target.value),
            });
        }
    };

    const saveChanges = () => {
        handleSaveClick(rowIndex, localRowData, localName);
    };

    const handleKeyDown = (e, rowIndex) => {
        if (e.key === 'Enter') {
            handleSaveClick(rowIndex, localRowData, localName);
        }
    };

    return (
        <Tr key={`row-${rowIndex}`}>
            <Td textAlign="center" verticalAlign="middle">
                {editRowIndex === rowIndex ? (
                    <IconButton
                        icon={<CheckIcon />}
                        colorScheme="teal"
                        onClick={saveChanges}
                        aria-label="Save"
                        size="sm"
                    />
                ) : (
                    <IconButton
                        icon={<EditIcon />}
                        onClick={() => handleEditClick(row.index)}
                        aria-label="Edit"
                        size="sm"
                    />
                )}
            </Td>
            <Td textAlign="center" verticalAlign="middle">
                {row.index}
            </Td>
            <Td textAlign="center" verticalAlign="middle">
                <ImageCell rowIndex={rowIndex} src={row.SpriteImage} />
            </Td>
            {row.showName && (
                <Td
                    textAlign="center"
                    verticalAlign="middle"
                    onClick={() => handleEditClick(row.index)}
                    onKeyDown={e => handleKeyDown(e, row.index)}
                    cursor="pointer"
                >
                    <EditableCell
                        index="name"
                        inputValue={localName}
                        rawValue={row.name}
                        isEdit={editRowIndex === rowIndex}
                        handleInputChange={handleInputChange}
                        isName={true}
                    />
                </Td>
            )}
            <Td textAlign="center" verticalAlign="middle">
                <ImageCell rowIndex={rowIndex} src={row.AttackImage} />
            </Td>
            <Td textAlign="center" verticalAlign="middle">
                {row.AltAttackImage ? (
                    <ImageCell rowIndex={rowIndex} src={row.AltAttackImage} />
                ) : null}
            </Td>
            {Object.keys(row.attributes).map(key => (
                <Td
                    key={`td-${key}`}
                    textAlign="center"
                    verticalAlign="middle"
                    onClick={() => handleEditClick(row.index)}
                    onKeyDown={e => handleKeyDown(e, row.index, row.attributes)}
                    cursor="pointer"
                >
                    <EditableCell
                        index={key}
                        inputValue={localRowData[key]}
                        rawValue={row.attributes[key]}
                        isEdit={editRowIndex === rowIndex}
                        handleInputChange={handleInputChange}
                    />
                </Td>
            ))}
        </Tr>
    );
};

const generateCharacters = (charInfos, imageDatas, sortConfig, names = [], isPencPlus = false) => {
    const characters = charInfos.map((info, index) => {
        return {
            index,
            attributes: info,
            name: names[index] || '',
            showName: isPencPlus,
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

    if (sortConfig.key) {
        return characters.sort((a, b) =>
            sortConfig.direction === 'desc'
                ? b[sortConfig.key] - a[sortConfig.key]
                : a[sortConfig.key] - b[sortConfig.key]
        ); // Sort descending by score;
    } else {
        return characters;
    }
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
    const { charInfos, imageDatas, names = [], firmware } = data;
    const isPencPlus = firmware.id.includes('+');
    const [editRowIndex, setEditRowIndex] = useState(null);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc',
    });
    const [tableData, setTableData] = useState(
        generateCharacters(charInfos, imageDatas, sortConfig, names, isPencPlus)
    );

    const handleEditClick = index => {
        setEditRowIndex(index);
    };

    const handleSaveClick = (rowIndex, newAttributes, newName) => {
        const updatedTableData = [...tableData];
        const foundIndex = updatedTableData.findIndex(
            item => item.index === rowIndex
        );
        updatedTableData[foundIndex] = {
            ...generateCharacter(
                updatedTableData[foundIndex],
                newAttributes,
                imageDatas
            ),
            name: newName
        };
        setTableData(updatedTableData);
        const attributes = updatedTableData.map(row => row.attributes);
        const names = updatedTableData.map(row => row.name);
        const updatedData = { ...data, charInfos: attributes, names };
        updateCharInfos(updatedData);
        setEditRowIndex(null);
    };

    const handleSort = key => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedData = [...tableData].sort((a, b) => {
            const aValue = key in a.attributes ? a.attributes[key] : a[key];
            const bValue = key in b.attributes ? b.attributes[key] : b[key];

            if (aValue < bValue) return direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setTableData(sortedData);
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
                        <Th textAlign="center">Edit</Th>
                        <Th
                            cursor="pointer"
                            textAlign="center"
                            onClick={() => handleSort('index')}
                        >
                            ID
                            {sortConfig.key === 'index' &&
                                (sortConfig.direction === 'asc'
                                    ? '\u00A0▲'
                                    : '\u00A0▼')}
                        </Th>
                        <Th textAlign="center">Sprite</Th>
                        {data.firmware.id.includes('+') && (
                            <Th textAlign="center">Name</Th>
                        )}
                        <Th textAlign="center">AtkSprite</Th>
                        <Th textAlign="center">AltAtkSprite</Th>
                        {data.spriteMetadata.Stats.map((stat, index) => (
                            <Th
                                key={`header-${index}`}
                                textAlign="center"
                                onClick={() => handleSort(stat)}
                                cursor="pointer"
                            >
                                {stat}
                                {sortConfig.key === stat &&
                                    (sortConfig.direction === 'asc'
                                        ? '\u00A0▲'
                                        : '\u00A0▼')}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {tableData.map((row, rowIndex) => (
                        <EditableRow
                            key={row.index}
                            row={row}
                            rowIndex={row.index}
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
