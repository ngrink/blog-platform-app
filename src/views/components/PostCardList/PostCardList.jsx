import React from 'react'
import { VStack } from '@chakra-ui/react';

import { PostCard } from '../PostCard';


export const PostCardList = ({ posts, onLike, onUnlike }) => {
    return (
        <VStack gap="50px">
            {posts && posts.map(post => (
                <PostCard key={post._id}
                    {...post}
                    onLike={onLike}
                    onUnlike={onUnlike}
                />
            ))}
        </VStack>
    )
}
