import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Spacer, Text, VStack } from '@chakra-ui/react';
import Output from 'editorjs-react-renderer';

import { PostHeader } from '../PostHeader';
import { PostTags } from '../PostTags';
import { PostPreview } from '../PostPreview';
import { PostFooter } from '../PostFooter';
import { styles } from '../../../utils/libs/editorjs/editorjs.config';
import cl from "./Post.module.scss";


export const Post = ({
    _id: postId,
    title,
    description,
    content,
    slug,
    author,
    publishedAt,
    preview,
    tags,
    likes,
    comments,
    views,
    isPostOwnedByUser,
    isPublished,
    onLike,
    onUnlike
}) => {
    return (
        <Flex className={cl.card} flexDirection="column">
            <VStack className={cl.cardContainer} gap="16px" alignItems="flex-start">
                <PostHeader
                    postId={postId}
                    author={author}
                    publishedAt={publishedAt}
                    isPostOwnedByUser={isPostOwnedByUser}
                    isPublished={isPublished}
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
                <Box className={cl.renderContainer}>
                    <Output data={content} style={styles} />
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
