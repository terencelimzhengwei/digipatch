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
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { HamburgerIcon } from '@chakra-ui/icons';

const Nav = props => {
    const { pageActive, fileUploaded, navClick, restartClick, buildClick } =
        props;
    const [menuOpen, setMenuOpen] = useState(false);

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
                                Upload BIN
                            </MenuItem>
                        )}
                        {fileUploaded && (
                            <>
                                <MenuItem onClick={() => handleMenuClick(1)}>
                                    Update Images
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuClick(2)}>
                                    Update Stats
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuClick(3)}>
                                    Update Quest Mode
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuClick(6)}>
                                    Update Animations
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
                            Upload BIN
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
                                Update Images
                            </Button>
                            <Button
                                fontSize={['sm', 'md']}
                                variant="ghost"
                                isActive={pageActive === 2}
                                onClick={() => navClick(2)}
                            >
                                Update Stats
                            </Button>
                            <Button
                                fontSize={['sm', 'md']}
                                variant="ghost"
                                isActive={pageActive === 3}
                                onClick={() => navClick(3)}
                            >
                                Update Quest Mode
                            </Button>
                            <Button
                                fontSize={['sm', 'md']}
                                variant="ghost"
                                isActive={pageActive === 6}
                                onClick={() => navClick(6)}
                            >
                                Update Idle Animation
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
                    <Button
                        fontSize={['sm', 'md']}
                        colorScheme="green"
                        onClick={buildClick}
                    >
                        Build
                    </Button>
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
