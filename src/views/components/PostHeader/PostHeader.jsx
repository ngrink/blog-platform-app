import React from 'react'
import { Box, Flex, Spacer } from '@chakra-ui/react';
import moment from 'moment';

import { UserAvatar } from '../UserAvatar';
import { PostMenuContainer } from '../../containers/PostMenuContainer';


export const PostHeader = ({
    postId,
    author,
    createdAt,
    isPostOwnedByUser,
    isPublished
}) => {
    return (
        <Flex w="100%">
            <UserAvatar
                src={author.profile.avatar}
                name={author.profile.fullname}
                username={author.username}
                subtitle={moment(createdAt).fromNow()}
                />
            <Spacer />
            <PostMenuContainer
                postId={postId}
                isPostOwnedByUser={isPostOwnedByUser}
                isPublished={isPublished}
            />
        </Flex>
    )
}
