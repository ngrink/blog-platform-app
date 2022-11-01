import React from 'react'
import { AspectRatio, Box, Button, Flex, Heading, HStack, Image, Spacer, Stack, Tag, Text, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserAvatar } from '../UserAvatar';
import cl from "./PostCard.module.scss";


export const PostCard = ({
    title,
    description,
    author,
    date,
    preview,
    tags,
    likesCount,
    commentsCount,
    viewsCount,
    isLiked
}) => {
    return (
        <Box className={cl.card}>
            <Box>
                <AspectRatio ratio={16 / 9}>
                    <Image src={preview} objectFit="cover"/>
                </AspectRatio>
            </Box>
            <Box className={cl.content}>
                <VStack gap="10px" alignItems="flex-start">
                    <UserAvatar src={author.img} name={author.fullname} subtitle={date}/>
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
                    <Button
                        variant="outline"
                        leftIcon={isLiked
                            ? <FontAwesomeIcon icon="fa-solid fa-heart"/>
                            : <FontAwesomeIcon icon="fa-regular fa-heart"/>
                    }>
                        {likesCount}
                    </Button>
                    <Button
                        variant="outline"
                        leftIcon={<FontAwesomeIcon icon="fa-regular fa-message"/>}
                    >
                        {commentsCount}
                    </Button>
                    <Spacer />
                    <Flex gap="8px" align="center">
                        <FontAwesomeIcon icon="fa-solid fa-eye"/>
                        <Text fontWeight={500}>
                            {viewsCount}
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    )
}
