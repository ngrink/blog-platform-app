import React, { useState } from 'react'
import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import cl from "./PostFooter.module.scss";
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';


export const PostFooter = observer(({
    postId,
    likes,
    comments,
    views,
    onLike,
    onUnlike
}) => {
  const [isLikedByUser, setIsLikedByUser] = useState(likes.isLikedByUser);
  const [likesCount, setLikesCount] = useState(likes.count);

  const like = () => {
    onLike(postId);
    setIsLikedByUser(true);
    setLikesCount(v => v + 1);
  }

  const unlike = () => {
    onUnlike(postId);
    setIsLikedByUser(false);
    setLikesCount(v => v - 1)

  }

    return (
        <Box className={cl.footer}>
            <Flex gap="10px" w="100%" align="center">
                <Button
                    onClick={isLikedByUser
                      ? unlike
                      : like
                    }
                    variant={isLikedByUser ? "solid" : "outline"}
                    colorScheme={isLikedByUser ? "blue" : "gray"}
                    leftIcon={isLikedByUser
                        ? <FontAwesomeIcon icon="fa-solid fa-heart"/>
                        : <FontAwesomeIcon icon="fa-regular fa-heart"/>
                }>
                    {likesCount}
                </Button>
                <Link to={`/posts/${postId}#comments`}>
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
                </Link>
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
})
