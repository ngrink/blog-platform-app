import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Spacer, Text, VStack } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc';

import { PostHeader } from '../PostHeader';
import { PostTags } from '../PostTags';
import { PostPreview } from '../PostPreview';
import { PostFooter } from '../PostFooter';
import cl from "./Post.module.scss";


export const Post = ({
    _id: postId,
    title,
    description,
    content,
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
        <Flex className={cl.card} flexDirection="column">
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
            <Box className={cl.cardContainer} pt="16px" pb="32px">
                <VStack gap="12px" alignItems="flex-start">
                    <Heading as="h1" size="lg">{title}</Heading>
                    <Text>{description}</Text>
                </VStack>
            </Box>
            {preview &&
                <PostPreview
                    preview={preview}
                />
            }
            <Box className={cl.cardContainer} py="24px">
                <Box className={cl.markdownContainer}>
                    <ReactMarkdown remarkPlugins={[remarkToc, remarkGfm]}>{content}</ReactMarkdown>
                </Box>
            </Box>
            <Spacer />
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
        </Flex>
    )
}
