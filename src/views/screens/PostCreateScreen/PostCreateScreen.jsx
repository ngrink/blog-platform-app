import React from 'react'
import { Box } from '@chakra-ui/react'

import { PostCreateContainer } from '../../containers/PostCreateContainer';


export const PostCreateScreen = () => {
    return (
        <Box maxW="1000px" mx="auto">
            <PostCreateContainer />
        </Box>
    )
}
