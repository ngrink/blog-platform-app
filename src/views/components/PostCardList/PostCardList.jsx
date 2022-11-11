import React from 'react'
import { VStack } from '@chakra-ui/react';

import { PostCard } from '../PostCard';


export const PostCardList = ({ posts, deletedPosts, onLike, onUnlike }) => {
    return (
        <VStack gap="50px" as="ul" listStyleType="none">
            {posts && posts
                .filter(post => !deletedPosts.has(post._id))
                .map(post => (
                    <li key={post._id}>
                        <PostCard
                            {...post}
                            deletedPosts={deletedPosts}
                            onLike={onLike}
                            onUnlike={onUnlike}
                        />
                    </li>
                ))
            }
        </VStack>
    )
}
