import React from 'react'
import { Link } from 'react-router-dom';
import { AspectRatio, Box, Button, Flex, Heading, Image, Spacer, Tag, Text, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment/moment';

import { UserAvatar } from '../UserAvatar';
import cl from "./PostCard.module.scss";


export const PostCard = ({
    _id,
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
}) => {
    return (
        <Link to={`/posts/${slug}`}>
            <Box className={cl.card}>
                {preview && <Box>
                    <AspectRatio ratio={16 / 9}>
                        <Image src={preview} objectFit="cover"/>
                    </AspectRatio>
                </Box>}
                <Box className={cl.content}>
                    <VStack gap="10px" alignItems="flex-start">
                        <UserAvatar
                            src={author.profile.avatar}
                            name={author.profile.fullname}
                            subtitle={moment(createdAt).fromNow()}
                        />
                        <Flex wrap="wrap" gap="10px">
                            {tags.map(tag => (
                                <Tag variant="subtle">{tag}</Tag>
                            ))}
                        </Flex>
                        <Heading fontSize="26px" noOfLines={3}>{title}</Heading>
                        <Text>{description}</Text>
                    </VStack>
                </Box>
                <Box className={cl.footer}>
                    <Flex gap="10px" w="100%" align="center">
                        <Button onClick={(e) => e.stopPropagation()}
                            variant={likes.isLikedByUser ? "solid" : "outline"}
                            colorScheme={likes.isLikedByUser ? "blue" : "gray"}
                            leftIcon={likes.isLikedByUser
                                ? <FontAwesomeIcon icon="fa-solid fa-heart"/>
                                : <FontAwesomeIcon icon="fa-regular fa-heart"/>
                        }>
                            {likes.count}
                        </Button>
                        <Button
                            variant={likes.isLikedByUser ? "solid" : "outline"}
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
            </Box>
        </Link>
    )
}
