import React from 'react'
import { Box } from '@chakra-ui/react';

import { PostEditContainer } from '../../containers/PostEditContainer';


export const PostEditScreen = () => {
    return (
        <Box w="100%" maxW="1000px" mx="auto">
            <PostEditContainer />
        </Box>
    )
}
