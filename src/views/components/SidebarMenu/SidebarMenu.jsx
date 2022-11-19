import React from 'react';
import { NavLink } from 'react-router-dom';
import { HStack, List, ListItem, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from "classnames";

import cl from "./SidebarMenu.module.scss";


export const SidebarMenu = () => {
    const NavLinkClassName = ({ isActive }) => {
        return isActive
            ? cn(cl.link, cl.active)
            : cl.link
    }

    return (
        <List className={cl.menu} spacing={1}>
            <ListItem className={cl.item}>
                <NavLink to="/popular" className={NavLinkClassName}>
                    <HStack spacing={4}>
                        <FontAwesomeIcon icon="fa-solid fa-fire-flame-curved" />
                        <Text>Популярное</Text>
                    </HStack>
                </NavLink>
            </ListItem>
            <ListItem className={cl.item}>
                <NavLink to="/new" className={NavLinkClassName}>
                    <HStack spacing={4}>
                        <FontAwesomeIcon icon="fa-solid fa-clock" />
                        <Text>Недавнее</Text>
                    </HStack>
                </NavLink>
            </ListItem>
            <ListItem className={cl.item}>
                <NavLink to="/followed" className={NavLinkClassName}>
                    <HStack spacing={4}>
                        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                        <Text>Моя лента</Text>
                    </HStack>
                </NavLink>
            </ListItem>
            <ListItem className={cn(cl.item, cl.bookmarks)}>
                <NavLink to="/bookmarks" className={NavLinkClassName}>
                    <HStack spacing={4}>
                        <FontAwesomeIcon icon="fa-solid fa-bookmark" />
                        <Text>Закладки</Text>
                    </HStack>
                </NavLink>
            </ListItem>
        </List>
    )
}
