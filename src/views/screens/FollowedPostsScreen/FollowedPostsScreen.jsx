import React from 'react'
import { Box } from '@chakra-ui/react'

import { PostCardListContainer } from '../../containers/PostCardListContainer';


export const FollowedPostsScreen = () => {
    return (
        <Box maxW="640px" mx="auto" pt="50px" pb="50px">
            <PostCardListContainer feed="followed" />
        </Box>
    )
}
