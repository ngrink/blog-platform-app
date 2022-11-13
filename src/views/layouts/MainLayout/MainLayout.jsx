import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

import { Header } from '../../components/Header'


export const MainLayout = () => {
  return (
    <>
        <Header />
        <Box as="main" pt="60px">
            <Outlet />
        </Box>
    </>
  )
}
