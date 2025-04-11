import React, { useState } from 'react';
import {
    Flex,
    Spacer,
    Button,
    ButtonGroup,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useBreakpointValue,
    Input,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { HamburgerIcon } from '@chakra-ui/icons';

const Nav = props => {
    const { pageActive, fileUploaded, navClick, restartClick, buildClick } =
        props;
    const [menuOpen, setMenuOpen] = useState(false);
    const fileInputRef = React.useRef();

    // Determine whether to display buttons or a hamburger menu based on screen size
    const isMobile = useBreakpointValue({
        base: true,
        md: true,
        lg: true,
        xl: false,
    });

    const handleMenuClick = index => {
        navClick(index);
        setMenuOpen(false); // Close menu after a click
    };

    const handleJsonImport = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = event => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    props.onJsonImport(jsonData);
                    // Reset the file input after processing
                    event.target.value = '';
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    // Reset the file input even if there's an error
                    event.target.value = '';
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <Flex p={2} align="center">
            {isMobile ? (
                <Menu isOpen={menuOpen}>
                    <MenuButton
                        as={IconButton}
                        icon={<HamburgerIcon />}
                        variant="outline"
                        onClick={() => setMenuOpen(!menuOpen)}
                    />
                    <MenuList fontSize={'sm'}>
                        {!fileUploaded && (
                            <MenuItem onClick={() => handleMenuClick(0)}>
                                Home
                            </MenuItem>
                        )}
                        {fileUploaded && (
                            <>
                                <MenuItem onClick={() => handleMenuClick(1)}>
                                    Images
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuClick(2)}>
                                    Characters
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuClick(3)}>
                                    Quests
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuClick(6)}>
                                    Animations
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuClick(4)}>
                                    Patches
                                </MenuItem>
                            </>
                        )}
                        <MenuItem onClick={() => handleMenuClick(5)}>
                            About
                        </MenuItem>
                    </MenuList>
                </Menu>
            ) : (
                <ButtonGroup variant="outline" spacing="2">
                    {!fileUploaded ? (
                        <Button
                            fontSize={['sm', 'md']}
                            variant="ghost"
                            isActive={pageActive === 0}
                            onClick={() => navClick(0)}
                        >
                            Home
                        </Button>
                    ) : null}
                    {fileUploaded ? (
                        <>
                            <Button
                                fontSize={['sm', 'md']}
                                variant="ghost"
                                isActive={pageActive === 1}
                                onClick={() => navClick(1)}
                            >
                                Images
                            </Button>
                            <Button
                                fontSize={['sm', 'md']}
                                variant="ghost"
                                isActive={pageActive === 2}
                                onClick={() => navClick(2)}
                            >
                                Characters
                            </Button>
                            <Button
                                fontSize={['sm', 'md']}
                                variant="ghost"
                                isActive={pageActive === 3}
                                onClick={() => navClick(3)}
                            >
                                Quests
                            </Button>
                            <Button
                                fontSize={['sm', 'md']}
                                variant="ghost"
                                isActive={pageActive === 6}
                                onClick={() => navClick(6)}
                            >
                                Animations
                            </Button>
                            <Button
                                fontSize={['sm', 'md']}
                                variant="ghost"
                                isActive={pageActive === 4}
                                onClick={() => navClick(4)}
                            >
                                Patches
                            </Button>
                        </>
                    ) : null}
                    <Button
                        fontSize={['sm', 'md']}
                        variant="ghost"
                        isActive={pageActive === 5}
                        onClick={() => navClick(5)}
                    >
                        About
                    </Button>
                </ButtonGroup>
            )}
            <Spacer />
            <ButtonGroup variant="outline" spacing="2">
                {fileUploaded ? (
                    <>
                        <Button
                            fontSize={['sm', 'md']}
                            colorScheme="blue"
                            onClick={handleJsonImport}
                        >
                            Import Mod
                        </Button>
                        <Input
                            type="file"
                            accept=".json"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            display="none"
                        />
                        <Button
                            fontSize={['sm', 'md']}
                            colorScheme="green"
                            onClick={buildClick}
                        >
                            Build
                        </Button>
                    </>
                ) : null}
                {fileUploaded ? (
                    <Button
                        fontSize={['sm', 'md']}
                        colorScheme="red"
                        onClick={restartClick}
                    >
                        Restart
                    </Button>
                ) : null}
                <ColorModeSwitcher />
            </ButtonGroup>
        </Flex>
    );
};

export default Nav;
