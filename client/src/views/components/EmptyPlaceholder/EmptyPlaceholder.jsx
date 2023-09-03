import React from 'react';
import { Box, Image, Stack, Text, VStack } from '@chakra-ui/react';

import cl from "./EmptyPlaceholder.module.scss";
import paperImage from "../../../assets/img/paper.png";

export const EmptyPlaceholder = ({
  title,
  description,
  image
}) => {
    return (
        <Box className={cl.emptyPlaceholderWrapper}>
          <VStack className={cl.emptyPlaceholder} spacing={8} color="#333">
            <Image src={paperImage} alt="Empty Data Icon" boxSize={48} />
            <VStack spacing={2}>
              <Text fontSize="2xl"  fontWeight={500}>{title}</Text>
              {description && <Text color="#767676">{description}</Text>}
            </VStack>
          </VStack>
        </Box>
    )
}

export const PostsEmptyPlaceholder = () => (
  <EmptyPlaceholder title="Нет постов" />
)

export const OwnPostsEmptyPlaceholder = () => (
  <EmptyPlaceholder
    title="Нет ваших постов"
    description="Создайте свой первой пост, чтобы увидеть его здесь"
  />
)

export const FollowedEmptyPlaceholder = () => (
  <EmptyPlaceholder
    title="Нет постов"
    description="Подпишитесь на авторов, чтобы видеть их посты здесь"
  />
)

export const BookmarksEmptyPlaceholder = () => (
  <EmptyPlaceholder
    title="Нет закладок"
    description="Добавьте пост в закладки, чтобы увидеть его здесь"
  />
)
