import React from 'react'
import { VStack } from '@chakra-ui/react';

import { PostCard } from '../PostCard';


export const PostCardList = ({ posts }) => {
    return (
        <VStack gap="50px">
            {posts.map(post => (
                <PostCard key={post._id} {...post}/>
            ))}
        </VStack>
    )
}
