import React from 'react'
import { Box } from '@chakra-ui/react'

import { PostCreateContainer } from '../../containers/PostCreateContainer';


export const PostCreateScreen = () => {
    return (
        <Box w="100%" maxW="1000px" mx="auto">
            <PostCreateContainer />
        </Box>
    )
}
