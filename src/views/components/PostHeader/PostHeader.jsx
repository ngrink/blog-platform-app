import React from 'react'
import { Box, Flex, Spacer } from '@chakra-ui/react';
import moment from 'moment';

import { UserAvatar } from '../UserAvatar';
import { PostMenu } from '../PostMenu';


export const PostHeader = ({ postId, author, createdAt, isPostOwnedByUser }) => {
    return (
        <Flex w="100%">
            <UserAvatar
                src={author.profile.avatar}
                name={author.profile.fullname}
                username={author.username}
                subtitle={moment(createdAt).fromNow()}
                />
            <Spacer />
            <PostMenu
                postId={postId}
                isPostOwnedByUser={isPostOwnedByUser}
            />
        </Flex>
    )
}
