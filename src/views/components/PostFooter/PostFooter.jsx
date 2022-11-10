import React from 'react'
import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import cl from "./PostFooter.module.scss";


export const PostFooter = ({
    postId,
    likes,
    comments,
    views,
    onLike,
    onUnlike
}) => {
    return (
        <Box className={cl.footer}>
            <Flex gap="10px" w="100%" align="center">
                <Button onClick={likes.isLikedByUser
                    ? (e) => {onUnlike(postId)}
                    : (e) => {onLike(postId)}
                }
                    variant={likes.isLikedByUser ? "solid" : "outline"}
                    colorScheme={likes.isLikedByUser ? "blue" : "gray"}
                    leftIcon={likes.isLikedByUser
                        ? <FontAwesomeIcon icon="fa-solid fa-heart"/>
                        : <FontAwesomeIcon icon="fa-regular fa-heart"/>
                }>
                    {likes.count}
                </Button>
                <Button
                    variant={comments.isCommentedByUser ? "solid" : "outline"}
                    colorScheme={comments.isCommentedByUser ? "blue" : "gray"}
                    leftIcon={comments.isCommentedByUser
                        ? <FontAwesomeIcon icon="fa-solid fa-message"/>
                        : <FontAwesomeIcon icon="fa-regular fa-message"/>
                    }
                >
                    {comments.count}
                </Button>
                <Spacer />
                <Flex gap="8px" align="center">
                    <FontAwesomeIcon icon="fa-solid fa-eye"/>
                    <Text fontWeight={500}>
                        {views}
                    </Text>
                </Flex>
            </Flex>
        </Box>
    )
}
