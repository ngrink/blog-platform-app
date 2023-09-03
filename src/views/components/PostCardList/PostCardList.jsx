import React from 'react'
import { VStack } from '@chakra-ui/react';

import { PostCard } from '../PostCard';


export const PostCardList = ({ posts, onLike, onUnlike }) => {
    if (!posts.length) {
      return null
    }

    return (
        <VStack gap="50px" as="ul" listStyleType="none">
        {posts.map((post) => (
            <li key={post._id} style={{width: "100%"}}>
                <PostCard
                    {...post}
                    onLike={onLike}
                    onUnlike={onUnlike}
                />
            </li>
          ))
        }
        </VStack>
    )
}
