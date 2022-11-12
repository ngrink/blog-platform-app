import React from 'react'
import { Link } from 'react-router-dom';
import { HStack, Icon } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Logo } from '../Logo';
import cl from "./Header.module.scss";



export const Header = () => {
  return (
    <header className={cl.header}>
        <div className={cl.container}>
            <HStack gap="8px">
                <FontAwesomeIcon size="lg" icon="bars" color='#333'
                    onClick={() => console.log(`Hamburger clicked`)}
                    aria-label="Открыть меню"
                />
                <Link to="/">
                    <Logo />
                </Link>
            </HStack>
            <HStack>
            {/* <SearchBar /> */}
            {/* <CreateBtn /> */}
            </HStack>
            {/* <Profile /> */}
        </div>
    </header>
  )
}
