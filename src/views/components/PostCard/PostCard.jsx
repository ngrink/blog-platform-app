import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

import { PostHeader } from '../PostHeader';
import { PostTags } from '../PostTags';
import { PostPreview } from '../PostPreview';
import { PostFooter } from '../PostFooter';
import cl from "./PostCard.module.scss";


export const PostCard = ({
    _id: postId,
    title,
    description,
    slug,
    author,
    createdAt,
    preview,
    tags,
    likes,
    comments,
    views,
    isPostOwnedByUser,
    onLike,
    onUnlike
}) => {
    return (
        <Box className={cl.card}>
            <VStack className={cl.cardContainer} gap="16px" alignItems="flex-start">
                <PostHeader
                    postId={postId}
                    author={author}
                    createdAt={createdAt}
                    isPostOwnedByUser={isPostOwnedByUser}
                />
                <PostTags
                    tags={tags}
                />
            </VStack>
            <Link to={`/posts/${postId}`}>
                <Box className={cl.cardContainer} py="16px">
                    <VStack gap="12px" alignItems="flex-start">
                        <Heading fontSize="26px" noOfLines={3}>{title}</Heading>
                        <Text>{description}</Text>
                    </VStack>
                </Box>
                {preview &&
                    <PostPreview
                        preview={preview}
                    />
                }
            </Link>
            <Box className={cl.cardContainer}>
                <PostFooter
                    postId={postId}
                    likes={likes}
                    comments={comments}
                    views={views}
                    onLike={onLike}
                    onUnlike={onUnlike}
                />
            </Box>
        </Box>
    )
}
