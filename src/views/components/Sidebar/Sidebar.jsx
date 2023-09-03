import React from 'react';
import { Box } from '@chakra-ui/react';
import cn from 'classnames';

import { SidebarMenu } from '../SidebarMenu/SidebarMenu';
import cl from "./Sidebar.module.scss";


export const Sidebar = ({ isSidebarOpen }) => {
    return (
        <Box className={isSidebarOpen
            ? cn(cl.sidebar, cl.open)
            : cl.sidebar
        }>
            <SidebarMenu />
        </Box>
    )
}
