import React from 'react'
import { Box } from '@chakra-ui/react';

import { PostCardListContainer } from '../../containers/PostCardListContainer';


export const PopularPostsScreen = () => {
    return (
        <Box maxW="640px" mx="auto" pt="50px" pb="50px">
            <PostCardListContainer />
        </Box>
    )
}
