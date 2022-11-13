import React from 'react'
import { Link } from 'react-router-dom';
import { HStack, Portal } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useToggle } from '../../../utils/hooks/useToggle';
import { CreatePostButtonContainer } from '../../containers/CreatePostButtonContainer';
import { Sidebar } from '../Sidebar/Sidebar';
import { Logo } from '../Logo';
import cl from "./Header.module.scss";


export const Header = () => {
  const [isSidebarOpen, toggleSidebar] = useToggle(true);

  return (
    <header className={cl.header}>
        <div className={cl.container}>
            <HStack gap="8px">
                <FontAwesomeIcon size="lg" icon="bars" color='#333'
                    onClick={toggleSidebar}
                    cursor="pointer"
                    aria-label="Открыть боковое меню"
                />
                <Link to="/">
                    <Logo />
                </Link>
            </HStack>
            <HStack>
                {/* <SearchBar /> */}
                <CreatePostButtonContainer />
            </HStack>
            {/* <Profile /> */}
            <Portal>
                <Sidebar isSidebarOpen={isSidebarOpen}/>
            </Portal>
        </div>
    </header>
  )
}
