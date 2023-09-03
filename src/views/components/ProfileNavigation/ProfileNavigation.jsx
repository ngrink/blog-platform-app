import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import cl from "./ProfileNavigation.module.scss";


export const ProfileNavigation = ({
    isAuth,
    accountId,
    fullname,
    avatar,
    onLogout
}) => {

    if (!isAuth) {
        return (
            <Link to="/login">
                <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" size="lg" color="#fff" />
            </Link>
        )
    }

    return (
        <Box className={cl.profileNavigation}>
            <Menu className={cl.menu}>
                <MenuButton>
                    <Avatar
                        name={fullname}
                        src={avatar}
                        size="sm"
                    />
                </MenuButton>
                <MenuList color="#333">
                    {/* <Link to={`/authors/${accountId}`}>
                        <MenuItem icon={<FontAwesomeIcon icon="fa-solid fa-user" size="lg" />}>
                                Профиль
                        </MenuItem>
                    </Link> */}
                    <Link to={`/drafts`}>
                        <MenuItem icon={<FontAwesomeIcon icon="fa-solid fa-note-sticky" size="lg" />}>
                                Черновики
                        </MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem
                        color="red.600"
                        icon={<FontAwesomeIcon icon="fa-solid fa-right-from-bracket" size="lg" />}
                        onClick={onLogout}
                    >
                        Выйти
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    )
}
