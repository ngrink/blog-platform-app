import React from 'react'
import { Box } from '@chakra-ui/react';

import { PostEditContainer } from '../../containers/PostEditContainer';


export const PostEditScreen = () => {
    return (
        <Box maxW="1000px" mx="auto">
            <PostEditContainer />
        </Box>
    )
}
