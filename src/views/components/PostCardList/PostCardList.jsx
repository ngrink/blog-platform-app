import React from 'react'
import { VStack } from '@chakra-ui/react';

import { PostCard } from '../PostCard';


export const PostCardList = ({ posts, onLike, onUnlike }) => {
    return (
        <VStack gap="50px" as="ul" listStyleType="none">
            {posts && posts.map(post => (
                <li key={post._id}>
                    <PostCard
                        {...post}
                        onLike={onLike}
                        onUnlike={onUnlike}
                    />
                </li>
            ))}
        </VStack>
    )
}
