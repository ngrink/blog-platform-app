import React from 'react'
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { HStack, Portal } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useToggle } from '../../../utils/hooks/useToggle';
import { CreatePostButtonContainer } from '../../containers/CreatePostButtonContainer';
import { ProfileNavigationContainer } from '../../containers/ProfileNavigationContainer/ProfileNavigationContainer';
import { Sidebar } from '../Sidebar/Sidebar';
import { SearchBar } from '../SearchBar';
import { Logo } from '../Logo';
import cl from "./Header.module.scss";


export const Header = observer(({ postStore }) => {
  const [isSidebarOpen, toggleSidebar] = useToggle(true);

  return (
    <header className={cl.header}>
        <div className={cl.container}>
            <HStack gap="8px" justifySelf={"left"}>
                <FontAwesomeIcon size="lg" icon="bars" color='#ddd' opacity={0.35}
                    onClick={toggleSidebar}
                    cursor="pointer"
                    aria-label="Открыть боковое меню"
                />
                <Link to="/">
                    <Logo />
                </Link>
            </HStack>
            <HStack width={"640px"}>
                <SearchBar />
            </HStack>
            <HStack display={"flex"} gap={"16px"} justifyContent={"flex-end"}>
                <CreatePostButtonContainer />
                <ProfileNavigationContainer />
            </HStack>
            <Portal>
                <Sidebar isSidebarOpen={isSidebarOpen}/>
            </Portal>
        </div>
    </header>
  )
})
